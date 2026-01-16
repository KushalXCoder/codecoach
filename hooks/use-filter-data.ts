"use client";

import { FetchedQuestionsData, QuestionsData, RankedData } from "@/lib/types/global.types";
import { topicToCFTags } from "@/lib/helper/topicToTags";
import { getQuestions, userPrevQuestions } from "@/services/user.service";
import { problemsStore } from "@/store/problems.store";
import { profileStore } from "@/store/profile.store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const normalize = (s: string) => {
    return s.toLowerCase().replace(/[^a-z ]/g, "").trim();
};

export const useFilterData = () => {
    const { hydrated: problemsHydrated, leveledQuestions, setLeveledQuestions } = problemsStore();

    const {
        username,
        rating,
        updatedSettings,
        hydrated: profileHydrated,
        improveTopics,
        experiencedTopics,
    } = profileStore();

    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const userRating =
        updatedSettings && updatedSettings.rating
            ? updatedSettings.rating
            : rating;

    const ratingLow = userRating! - 300;
    const ratingHigh = userRating! + 300;

    const normalizedImproveTopics = improveTopics.flatMap(
        (topic) => topicToCFTags[normalize(topic)] ?? []
    );

    const normalizedExperiencedTopics = experiencedTopics.flatMap(
        (topic) => topicToCFTags[normalize(topic)] ?? []
    );

    const score = (p: QuestionsData) => {
        const difficultyScore = Math.exp(
            -Math.pow(p.rating! - userRating!, 2) / (2 * 200 * 200)
        );

        let topicScore = 0.3;
        if (p.tags.some((t) => normalizedImproveTopics.includes(normalize(t)))) {
            topicScore = 1;
        } else if (
            p.tags.some((t) =>
                normalizedExperiencedTopics.includes(normalize(t))
            )
        ) {
            topicScore = 0.6;
        }

        return 0.65 * difficultyScore + 0.35 * topicScore;
    };

    // Separate function to fetch and compute leveled questions, so that it can be used in React Query
    const fetchAndCompute = async () => {
        const problems = await getQuestions({ ratingLow, ratingHigh });
        if (!problems.success) {
            throw new Error("Failed to fetch problems");
        }

        const prevQuestions = await userPrevQuestions(username);
        if (!prevQuestions.success) {
            throw new Error("Failed to fetch previous questions");
        }

        const solvedIds = new Set(
            prevQuestions.data.map((q: FetchedQuestionsData) => q.id)
        );

        const unsolvedQuestions = problems.data.data.filter(
            (p: QuestionsData) => !solvedIds.has(p._id)
        );

        const filteredByTopics = unsolvedQuestions.filter((p: QuestionsData) =>
            p.tags.some((tag) =>
                normalizedImproveTopics.includes(normalize(tag))
            )
        );

        const ranked: RankedData[] = filteredByTopics
            .map((p: QuestionsData) => ({
                problem: p,
                score: score(p),
            }))
            .sort((a: RankedData, b: RankedData) => b.score - a.score);

        const unsolvedFiltered = ranked.filter(
            (r) => !solvedIds.has(r.problem._id)
        );

        return {
            low: unsolvedFiltered.filter(
                (p) => p.problem.rating < userRating!
            ),
            mid: unsolvedFiltered.filter(
                (p) => p.problem.rating === userRating!
            ),
            high: unsolvedFiltered.filter(
                (p) => p.problem.rating > userRating!
            ),
        };
    };

    // React Query to manage fetching and caching
    const query = useQuery({
        queryKey: [
            "leveledQuestions",
            username,
            userRating,
            improveTopics.join(","),
            experiencedTopics.join(","),
        ],
        queryFn: fetchAndCompute,
        enabled: false,
        staleTime: 10 * 60 * 1000,
    });

    useEffect(() => {
        if (!problemsHydrated || !profileHydrated || improveTopics.length === 0) {
            return;
        }

        const hasQuestions =
            leveledQuestions.low.length > 0 ||
            leveledQuestions.mid.length > 0 ||
            leveledQuestions.high.length > 0;

        if (hasQuestions) {
            setLoading(false);
            return;
        }

        setLoading(true);

        query
            .refetch()
            .then(({ data }) => {
                if (data) {
                    setLeveledQuestions(data);
                }
            })
            .catch(() => setIsError(true))
            .finally(() => setLoading(false));
    }, [improveTopics.join(","), profileHydrated, problemsHydrated]);

    return { leveledQuestions, loading, isError };
};