"use client";

import { QuestionsData, RankedData } from "@/lib/global.types";
import { topicToCFTags } from "@/lib/topicToTags";
import { getQuestions, saveProblems } from "@/services/user.service";
import { problemsStore } from "@/store/problems.store";
import { profileStore } from "@/store/profile.store";
import { useEffect, useState } from "react";

export const normalize = (s: string) => {
    return s.toLowerCase().replace(/[^a-z ]/g, "").trim();
}

export const useFilterData = () => {
    const { hydrated: problemsHydrated, lastFetched, questions, setQuestions } = problemsStore();
    const { codeforcesId, dailyLimit, rating, hydrated: profileHydrated, improveTopics, experiencedTopics } = profileStore();
    const [loading, setLoading] = useState<boolean>(true);

    const ratingLow = rating! - 300;
    const ratingHigh = rating! + 300;

    const normalizedImproveTopics = improveTopics.flatMap(topic => 
        topicToCFTags[normalize(topic)] ?? []
    );

    const normalizedExperiencedTopics = experiencedTopics.flatMap(topic => 
        topicToCFTags[normalize(topic)] ?? []
    );

    const score = (p: QuestionsData) => {
        const difficultyScore = Math.exp(
            -Math.pow(p.rating! - rating!, 2) / (2 * 200 * 200)
        );

        let topicScore = 0.3;
        if (p.tags.some(t => normalizedImproveTopics.includes(normalize(t)))) {
            topicScore = 1;
        } else if (p.tags.some(t => normalizedExperiencedTopics.includes(normalize(t)))) {
            topicScore = 0.6;
        }

        return 0.65 * difficultyScore + 0.35 * topicScore;
    };

    useEffect(() => {
        if(!problemsHydrated || !profileHydrated || improveTopics.length === 0) return;

        const twentyFourHours = 24 * 60 * 60 * 1000;

        if(questions.length > 0 && lastFetched && Date.now() - lastFetched < twentyFourHours) {
            setLoading(false);
            console.log("Using cached questions");
            return;
        }

        const run = async () => {
            // Stage 1: Fetch questions within the rating range
            const problems = await getQuestions({ ratingLow, ratingHigh });
        
            if(!problems.success) {
                // console.log(problems.message || "Failed to fetch questions for filtering");
                setLoading(false);
                return;
            }
        
            // console.log("Stage 1:", problems.data.data);
            // console.log("Improve Topics:", improveTopics);

            // Stage 2: Filtering based on the topics
            const filteredByTopics = problems.data.data.filter((p: QuestionsData) => 
                p.tags.some(tag =>
                    normalizedImproveTopics.includes(normalize(tag))
                )
            );

            // console.log("Stage 2:", filteredByTopics);

            // Stage 3: Score the selected questions
            const ranked: RankedData[] = filteredByTopics
            .map((p: QuestionsData) => ({
                problem: p,
                score: score(p),
            }))
            .sort((a: RankedData, b: RankedData) => b.score - a.score);

            // console.log("Stage 3:", ranked);

            const delta = Math.max(100, rating! * 0.2);

            const buckets = {
                below: ranked.filter((r: RankedData) => r.problem.rating < rating! - delta),
                near: ranked.filter((r: RankedData) => Math.abs(r.problem.rating - rating!) <= delta),
                above: ranked.filter((r: RankedData) => r.problem.rating > rating! + delta),
            };

            // console.log("Buckets:", buckets);

            const nearCount = Math.ceil(dailyLimit! * 0.5);
            const belowCount = Math.floor(dailyLimit! * 0.25);
            const aboveCount = dailyLimit! - nearCount - belowCount;

            const take = (arr: RankedData[], n: number) => {
                return arr.slice(0, Math.min(n, arr.length));
            }

            let selected: RankedData[] = [
                ...take(buckets.near, nearCount),
                ...take(buckets.below, belowCount),
                ...take(buckets.above, aboveCount),
            ];

            if (selected.length < dailyLimit!) {
                for (const r of ranked) {
                    if (selected.some(s => s.problem._id === r.problem._id)) continue;
                    selected.push(r);
                    if (selected.length === dailyLimit!) break;
                }
            }

            selected.sort(() => Math.random() - 0.5);

            // Update the store
            setQuestions(selected);

            // Store to database
            const data = await saveProblems(codeforcesId, selected);
            if(!data.success) {
                console.error(data.message || "Failed to save filtered problems");
                return;
            }
            
            setLoading(false);
        };

        run();
    }, [improveTopics]);

    return { data: questions, loading };
};