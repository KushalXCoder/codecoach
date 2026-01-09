import { LeveledQuestionsData, RankedData } from "../types/global.types";

export const getPrompt = async (
    rating: number,
    dailyLimit: number,
    improveTopics: string[],
    experiencedTopics: string[],
    leveledQuestions: LeveledQuestionsData,
) => {
    return `
    You are a competitive programming coach.
    
    User profile:
    - Rating: ${rating}
    - Daily problem limit: ${dailyLimit}
    - Improve topics: ${improveTopics.join(", ")}
    - Experienced topics: ${experiencedTopics.join(", ")}
    
    Instructions:
    - Select exactly ${dailyLimit} problems
    - Prefer problems near rating ${rating}–${rating + 100}
    - Include:
      - Mostly near-rating problems
      - 1 slightly easier problem if available
      - 1 harder/stretch problem if available
    - Prefer improve topics over experienced topics
    - Avoid choosing multiple problems that are too similar in idea
    - Do NOT invent problems
    
    Return ONLY valid JSON in this format:
    {
      "selected": [
        { "id": "problem_id", "index": "problem_index", "contestId": contest_id, "name": "problem_name", "rating": problem_rating, "tags": [ "tag1", "tag2", etc... ] },
      ]
    }
    or the same format in which the problems were give to you.
    
    Candidate problems:
    ${JSON.stringify(leveledQuestions, null, 2)}
    `;
}