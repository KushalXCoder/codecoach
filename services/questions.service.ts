// Not awaiting as I want the problems to be updated to redis in the background

import { QuestionsData } from "@/lib/types/global.types";

export const syncQuestions = async (
    codeforcesId: string,
    updatedTodaysQuestions: QuestionsData[]
) => {
    return fetch('/api/redis/sync-questions', {
        method: 'POST',
        body: JSON.stringify({ codeforcesId, updatedTodaysQuestions }),
    })
    .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Sync failed');
        }
        return data;
    });
}

export const updateQuestionDB = async (codeforcesId: string, updatedTodaysQuestions: QuestionsData[]) => {
    try {
        const res = await fetch('/api/user/update-questions', {
            method: 'PUT',
            body: JSON.stringify({ codeforcesId, updatedTodaysQuestions }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to update questions in DB");
        }

        return { success: true, message: data.message || "Questions updated in DB successfully", data };
    } catch (error: any) {
        console.error("Error updating questions in DB:", error);
        return { success: false, message: error.message || "Error updating questions in DB" };
    }
}