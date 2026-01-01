import { ProfileData } from "@/lib/global.types";

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