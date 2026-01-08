    // Not awaiting as I want the problems to be updated to redis in the background

    import { QuestionsData } from "@/lib/global.types";

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