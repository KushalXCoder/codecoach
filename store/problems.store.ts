import { RankedData } from "@/lib/global.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProblemsStore = {
    lastFetched: number | null;
    hydrated: boolean;
    questions: RankedData[];
    setQuestions: (questions: RankedData[]) => void;
    setHydrated: (value: boolean) => void;
};

export const problemsStore = create<ProblemsStore>()(
    persist((set) => ({
        lastFetched: null,
        questions: [],
        hydrated: false,
        setQuestions: (questions: RankedData[]) => set({ questions: questions, lastFetched: Date.now() }),
        setHydrated: (value: boolean) => set({ hydrated: value }),
    }), {
        name: "problems-storage",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        storage: createJSONStorage(() => sessionStorage),
    }),
);