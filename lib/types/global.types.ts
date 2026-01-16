export type UserData = {
    _id: string,
    email: string,
    codeforcesId: string,
    dailyLimit: number,
    rating: number,
    experiencedTopics: string[],
    improveTopics: string[],
}

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
    username: string,
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
    solved: boolean,
};

export type FetchedQuestionsData = {
    id: string,
    index: string,
    contestId: number,
    name: string,
    rating: number,
    points?: number,
    tags: string[],
}

export type RankedData = {
    problem: QuestionsData,
    score: number,
};

export type LeveledQuestionsData = {
    low: RankedData[],
    mid: RankedData[],
    high: RankedData[],
};

export type RatingType = "easy" | "medium" | "hard" | "expert";

// ------------------------------- JWT Payload Types ---------------------------------
export type JWTPayload = {
    data: {
        email: string;
        setupCompleted: boolean;
        profileData: {
            codeforcesId: string;
            dailyLimit: number;
            rating: number;
            experiencedTopics: string[];
            improveTopics: string[];
        }
    }
}

export type JWTCfPayload = {
    verified: boolean;
}

export type JWTProfilePayload = {
    profileId: string;
}