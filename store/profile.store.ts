import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProfileStore = {
    dailyLimit: number | null;
    rating: number | null;
    experiencedTopics: string[];
    improveTopics: string[];

    setDailyLimit: (val: number) => void;
    setRating: (val: number) => void;
    setExperiencedTopics: (topics: string[]) => void;
    setImproveTopics: (topics: string[]) => void;

    validateStep: (step: number) => { valid: boolean; message?: string };
}

export const profileStore = create<ProfileStore>()(
    persist((set,get) => ({
        dailyLimit: null,
        rating: null,
        experiencedTopics: [],
        improveTopics: [],

        setDailyLimit: (val) => set({ dailyLimit: val }),
        setRating: (val) => set({ rating: val }),
        setExperiencedTopics: (topics) => set({ experiencedTopics: topics }),
        setImproveTopics: (topics) => set({ improveTopics: topics }),

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
        partialize: (state) => ({
            dailyLimit: state.dailyLimit,
            rating: state.rating,
            experiencedTopics: state.experiencedTopics,
            improveTopics: state.improveTopics,
        }),
        storage: createJSONStorage(() => sessionStorage),
    }
));