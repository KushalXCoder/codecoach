import { ProfileData, QuestionsData, RatingType } from "@/lib/types/global.types";


export type ProfileDataType = {
    username: string,
    solvedQuestions: RatingType[],
    questions: QuestionsData[],
    todaysQuestions: QuestionsData[],
    streak: number,
}

export type ProfileDataResponse = {
    message: string,
    profileData: ProfileDataType,
};

export const getProfileData = async (username: string) : Promise<ProfileDataResponse> => {
    const res = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(username),
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message || 'Failed to fetch profile data');
    }

    return data;
}

export const checkUsername = async (username: string) => {
    const res = await fetch('/api/verify/username', {
        method: 'POST',
        body: JSON.stringify(username),
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message || 'Failed to verify username');
    }

    if(!data) {
        throw new Error(data.message || 'Internal Server Error');
    }

    return data;
}