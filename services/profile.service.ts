import { ProfileData, QuestionsData, RatingType } from "@/lib/types/global.types";


export type ProfileDataType = {
    codeforcesId: string,
    solvedQuestions: RatingType[],
    questions: QuestionsData[],
    todaysQuestions: QuestionsData[],
    streak: number,
}

export type ProfileDataResponse = {
    message: string,
    profileData: ProfileDataType,
};

export const getProfileData = async (codeforcesId: string) : Promise<ProfileDataResponse> => {
    const res = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(codeforcesId),
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message || 'Failed to fetch profile data');
    }

    return data;
}