import { LeveledQuestionsData, ProfileData } from "@/lib/types/global.types"

type getFinalSelectedProblemsProps = ProfileData & {
    leveledQuestions: LeveledQuestionsData,
};

export const getFinalSelectedProblems = async ({ username, rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions } : getFinalSelectedProblemsProps) => {
    try {
        const res = await fetch('/api/ai', {
            method: "POST",
            body: JSON.stringify({
                username,
                rating,
                dailyLimit,
                improveTopics,
                experiencedTopics,
                leveledQuestions,
            }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to fetch AI selected problems");
        }

        console.log('Data', data);

        return { success: true, selectedProblems: data.selectedProblems };
    } catch (error: any) {
        console.error("Error fetching AI selected problems:", error);
        return { success: false, message: error.message || "Error fetching AI selected problems" };
    }
}