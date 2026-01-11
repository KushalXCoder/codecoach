import { ProfileData, QuestionsData } from "@/lib/types/global.types";


type ProfileDataType = {
    codeforcesId: string,
    solvedQuestions: number,
    questions: QuestionsData[],
    todaysQuestions: QuestionsData[],
}

type ProfileDataResponse = {
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