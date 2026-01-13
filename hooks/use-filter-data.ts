"use client";

import { FetchedQuestionsData, LeveledQuestionsData, QuestionsData, RankedData } from "@/lib/types/global.types";
import { topicToCFTags } from "@/lib/helper/topicToTags";
import { getQuestions, saveProblems, userPrevQuestions } from "@/services/user.service";
import { problemsStore } from "@/store/problems.store";
import { profileStore } from "@/store/profile.store";
import { use, useEffect, useState } from "react";

export const normalize = (s: string) => {
    return s.toLowerCase().replace(/[^a-z ]/g, "").trim();
}

export const useFilterData = () => {
    const { hydrated: problemsHydrated, leveledQuestions, setLeveledQuestions } = problemsStore();
    const { codeforcesId, rating, updatedSettings, hydrated: profileHydrated, improveTopics, experiencedTopics } = profileStore();

    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const userRating = updatedSettings.rating ? updatedSettings.rating : rating;

    console.log('rating', userRating);

    const ratingLow = userRating! - 300;
    const ratingHigh = userRating! + 300;

    console.log(ratingLow, ratingHigh);

    const normalizedImproveTopics = improveTopics.flatMap(topic => 
        topicToCFTags[normalize(topic)] ?? []
    );

    const normalizedExperiencedTopics = experiencedTopics.flatMap(topic => 
        topicToCFTags[normalize(topic)] ?? []
    );

    const score = (p: QuestionsData) => {
        const difficultyScore = Math.exp(
            -Math.pow(p.rating! - userRating!, 2) / (2 * 200 * 200)
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

        // const twentyFourHours = 24 * 60 * 60 * 1000;

        const hasQuestions = 
            leveledQuestions.low.length > 0 ||
            leveledQuestions.mid.length > 0 ||
            leveledQuestions.high.length > 0;

        // if (hasQuestions) {
        //     if (loading) setLoading(false);
        //     return;
        // }

        const run = async () => {
            // Stage 1: Fetch questions within the rating range
            const problems = await getQuestions({ ratingLow, ratingHigh });
            
            if(!problems.success) {
                // console.log(problems.message || "Failed to fetch questions for filtering");
                setIsError(true);
                setLoading(false);
                return;
            }
            
            const prevQuestions = await userPrevQuestions(codeforcesId);
            if(!prevQuestions.success) {
                // console.log(prevQuestions.message || "Failed to fetch user previous questions");
                setIsError(true);
                setLoading(false);
                return;
            }

            console.log(prevQuestions);

            const solvedIds = new Set(
                prevQuestions.data.map((q: FetchedQuestionsData) => q.id),
            );

            const unsolvedQuestions = problems.data.data.filter((p: QuestionsData) =>
                !solvedIds.has(p._id)
            );
            

            // Stage 2: Filtering based on the topics
            const filteredByTopics = unsolvedQuestions.filter((p: QuestionsData) => 
                p.tags.some(tag =>
                    normalizedImproveTopics.includes(normalize(tag))
                )
            );

            console.log(filteredByTopics);

            // Stage 3: Score the selected questions
            const ranked: RankedData[] = filteredByTopics
            .map((p: QuestionsData) => ({
                problem: p,
                score: score(p),
            }))
            .sort((a: RankedData, b: RankedData) => b.score - a.score);

            const unsolvedFitered = ranked.filter((r: RankedData) => {
                return !solvedIds.has(r.problem._id);
            });

            const questions = {
                low: unsolvedFitered.filter(p => p.problem.rating < userRating!),
                mid: unsolvedFitered.filter(p => p.problem.rating === userRating!),
                high: unsolvedFitered.filter(p => p.problem.rating > userRating!),
            };

            setLeveledQuestions(questions);
            setLoading(false);
        };

        run();
    }, [improveTopics.join(','), profileHydrated, problemsHydrated]);

    return { leveledQuestions, loading, isError };
};