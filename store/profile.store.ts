import { ProfileData } from "@/lib/types/global.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProfileStore = {
    codeforcesId: string;
    username: string;
    dailyLimit: number | null;
    rating: number | null;
    experiencedTopics: string[];
    improveTopics: string[];
    hydrated: boolean;
    updatedSettings: Partial<ProfileData>;

    setCodeforcesId: (id: string) => void;
    setUsername: (name: string) => void;
    setDailyLimit: (val: number) => void;
    setRating: (val: number) => void;
    setExperiencedTopics: (topics: string[]) => void;
    setImproveTopics: (topics: string[]) => void;
    setUpdatedSettings: (changes: Partial<ProfileData>) => void;
    setHydrated: (val: boolean) => void;

    reset: () => void;
    hydrateFromServer: (data: Partial<ProfileStore>) => void;
    validateStep: (step: number) => { valid: boolean; message?: string };
}

const initialState = {
    codeforcesId: "",
    username: "",
    dailyLimit: null,
    rating: null,
    experiencedTopics: [],
    improveTopics: [],
    updatedSettings: {},
    hydrated: false,
};

export const profileStore = create<ProfileStore>()(
    persist((set,get) => ({
        ...initialState,

        setCodeforcesId: (id) => set({ codeforcesId: id }),
        setUsername: (name) => set({ username: name }),
        setDailyLimit: (val) => set({ dailyLimit: val }),
        setRating: (val) => set({ rating: val }),
        setExperiencedTopics: (topics) => set({ experiencedTopics: topics }),
        setImproveTopics: (topics) => set({ improveTopics: topics }),
        setUpdatedSettings: (changes) => set({ updatedSettings: changes }),
        setHydrated: (val) => set({ hydrated: val }),

        reset: () => set({ ...initialState }),
        hydrateFromServer: (data) => set({
            ...data,
            hydrated: true,
        }),
        validateStep: (step) => {
            const s = get();

            if(step === 0) {
                if(s.dailyLimit && (s.dailyLimit < 1 || s.dailyLimit > 10)) {
                    return { valid: false, message: "Daily limit must be between 1 and 10" };
                }
            }

            if(step === 1) {
                if(!s.rating || s.rating <= 0) {
                    return { valid: false, message: "Please enter a valid rating" };
                }
                if(s.improveTopics.length === 0) {
                    return { valid: false, message: "Please select at least one topic to improve" };
                }
                if(s.improveTopics.length > 3) {
                    return { valid: false, message: "You can select at most 3 improve topics" };
                }
            }

            return { valid: true };
        }
    }), {
        name: "profile-store",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        partialize: (state) => ({
            codeforcesId: state.codeforcesId,
            username: state.username,
            dailyLimit: state.dailyLimit,
            rating: state.rating,
            experiencedTopics: state.experiencedTopics,
            improveTopics: state.improveTopics,
            updatedSettings: state.updatedSettings,
            hydrated: state.hydrated,
        }),
        storage: createJSONStorage(() => sessionStorage),
    }
));