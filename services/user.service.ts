import { ProfileData, RankedData } from "@/lib/global.types";

type GetQuestionsProps = {
    ratingLow: number,
    ratingHigh: number,
};

export const saveData = async (profileData: ProfileData, codeforcesId: string) => {
    try {
        console.log("Saving data for:", codeforcesId, profileData);
        
        const res = await fetch('/api/user/save-data', {
            method: "PUT",
            body: JSON.stringify({ profileData, codeforcesId }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to save data");
        }

        return { success: true, data };
    } catch (error: any) {
        console.error("Could not save data:", error);
        return { success: false, message: error.message || "Failed to save data" };
    }
}

export const userLogout = async () => {
    try {
        const res = await fetch('/api/auth/logout');

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Logout failed");
        }

        return { success: true, data };
    } catch (error: any) {
        console.error("Logout failed:", error);
        return { success: false, message: error.message || "Logout failed" };
    }
}

export const getQuestions = async ({ ratingLow, ratingHigh} : GetQuestionsProps) => {
    try {
        const res = await fetch('/api/codeforces/get-questions', {
            method: "POST",
            body: JSON.stringify({ ratingLow, ratingHigh }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to fetch questions");
        }

        return { success: true, data };
    } catch (error: any) {
        console.error(error.message || "Failed to fetch questions");
        return { success: false, message: error.message || "Failed to fetch questions" };
    }
}

export const saveProblems = async (codeforcesId: string, problems: RankedData[]) => {
    try {
        const res = await fetch('/api/user/save-problems', {
            method: "PUT",
            body: JSON.stringify({ codeforcesId, problems }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to save problems");
        }

        return { success: true, message: data.message || "Problems saved successfully" };
    } catch (error: any) {
        console.error("Could not save problems:", error);
        return { success: false, message: error.message || "Failed to save problems" };
    }
}