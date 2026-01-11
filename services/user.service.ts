import { ProfileData, RankedData } from "@/lib/types/global.types";

type GetQuestionsProps = {
    ratingLow: number,
    ratingHigh: number,
};

export const verifyCodeforcesId = async (codeforcesId: string) => {
    try {
        const res = await fetch(`/api/verify`, {
            method: "POST",
            body: JSON.stringify({ codeforcesId }),
            cache: "no-store",
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Verification failed");
        }

        return { success: true, message: data.message || "Verification successful" };
    } catch (error: any) {
        console.error("Verification failed:", error);
        return { success: false, message: error.message || "Verification failed" };
    }
}

export const saveData = async (profileData: ProfileData) => {
    try {
        const res = await fetch('/api/user/save-data', {
            method: "PUT",
            body: JSON.stringify({ profileData }),
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

export const userPrevQuestions = async (codeforcesId: string) => {
    try {
        const res = await fetch('/api/user/prev-questions', {
            method: "POST",
            body: JSON.stringify({ codeforcesId }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to fetch previous questions");
        }

        return { success: true, message: data.message || "Previous questions fetched successfully", data: data.data };
    } catch (error: any) {
        console.error("Failed to fetch previous questions:", error);
        return { success: false, message: error.message || "Failed to fetch previous questions" };
    }
}

export const getUserSubmissions = async (codeforcesId: string) => {
    try {
        const res = await fetch('/api/codeforces/get-user-submissions', {
            method: "POST",
            body: JSON.stringify({ codeforcesId }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to fetch user submissions");
        }

        return { success: true, submissions: data.submissions };
    } catch (error: any) {
        console.error("Failed to fetch user submissions:", error);
        return { success: false, message: error.message || "Failed to fetch user submissions" };
    }
}

export const markSetupCompleted = async (codeforcesId: string) => {
    try {
        const res = await fetch('/api/user/completed-setup', {
            method: "PUT",
            body: JSON.stringify({ codeforcesId }),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to mark setup as completed");
        }

        return { success: true, message: data.message || "Setup marked as completed" };
    } catch (error) {
        console.error("Failed to mark setup as completed:", error);
        return { success: false, message: "Failed to mark setup as completed" };
    }
}

export const saveUserChanges = async (codeforcesId: string, updatedChanges: Partial<ProfileData>) => {
    try {
        const res = await fetch('/api/profile/save-changes', {
            method: "PUT",
            body: JSON.stringify({ codeforcesId, updatedChanges }),
        });
    
        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to save user changes");
        }
    
        return { success: true, message: data.message || "User changes saved successfully" };
    } catch (error: any) {
        console.error("Failed to save user changes:", error);
        return { success: false, message: error.message || "Failed to save user changes" };
    }
}