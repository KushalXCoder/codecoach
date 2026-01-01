export type InfoChangeProps = {
    dailyLimit: number,
};

export type SelectTopicsProps = {
    type: string;
}

export type AnalyzeData = {
    rating: number,
    experiencedTopics: string[],
    improveTopics: string[],
};

export type ProfileData = {
    dailyLimit: number | null,
    rating: number | null,
    experiencedTopics: string[],
    improveTopics: string[],
};

export type QuestionsData = {
    _id: string,
    index: string,
    contestId: number,
    name: string,
    rating: number,
    points: number,
    tags: string[],
};