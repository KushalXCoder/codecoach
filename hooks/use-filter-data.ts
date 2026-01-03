"use client";

import { LeveledQuestionsData, QuestionsData, RankedData } from "@/lib/global.types";
import { topicToCFTags } from "@/lib/topicToTags";
import { getQuestions, saveProblems, userPrevQuestions } from "@/services/user.service";
import { problemsStore } from "@/store/problems.store";
import { profileStore } from "@/store/profile.store";
import { useEffect, useState } from "react";

export const normalize = (s: string) => {
    return s.toLowerCase().replace(/[^a-z ]/g, "").trim();
}

export const useFilterData = () => {
    const { hydrated: problemsHydrated, lastFetched, leveledQuestions, setLeveledQuestions } = problemsStore();
    const { codeforcesId, rating, hydrated: profileHydrated, improveTopics, experiencedTopics } = profileStore();
    const [isError, setIsError] = useState<boolean>(false);
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

        const hasQuestions = 
            leveledQuestions.low.length > 0 ||
            leveledQuestions.mid.length > 0 ||
            leveledQuestions.high.length > 0;

        if(hasQuestions && lastFetched && Date.now() - lastFetched < twentyFourHours) {
            setLoading(false);
            console.log("Using cached questions");
            return;
        }

        const run = async () => {
            // Stage 1: Fetch questions within the rating range
            const problems = await getQuestions({ ratingLow, ratingHigh });
            
            if(!problems.success) {
                console.log(problems.message || "Failed to fetch questions for filtering");
                setIsError(true);
                setLoading(false);
                return;
            }
            
            // console.log("Stage 1:", problems.data.data);
            // console.log("Improve Topics:", improveTopics);
            
            const prevQuestions = await userPrevQuestions(codeforcesId);
            if(!prevQuestions.success) {
                console.log(prevQuestions.message || "Failed to fetch user previous questions");
                setIsError(true);
                setLoading(false);
                return;
            }

            console.log(prevQuestions);
            console.log("Previous Questions:", prevQuestions.data);

            const solvedIds = new Set(
                prevQuestions.data.map((q: QuestionsData) => q._id),
            );

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

            const unsolvedFitered = ranked.filter((r: RankedData) => {
                return !solvedIds.has(r.problem._id);
            });

            const questions = {
                low: unsolvedFitered.filter(p => p.problem.rating < rating!),
                mid: unsolvedFitered.filter(p => p.problem.rating === rating!),
                high: unsolvedFitered.filter(p => p.problem.rating > rating!),
            };

            console.log("Bands:", questions);

            setLeveledQuestions(questions);
            
            setLoading(false);
        };

        run();
    }, [improveTopics]);

    return { leveledQuestions, loading, isError };
};