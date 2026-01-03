import { LeveledQuestionsData, RankedData } from "@/lib/global.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProblemsStore = {
    lastFetched: number | null;
    hydrated: boolean;
    leveledQuestions: LeveledQuestionsData;

    setLeveledQuestions: (bands: LeveledQuestionsData) => void;
    setHydrated: (value: boolean) => void;
};

export const problemsStore = create<ProblemsStore>()(
    persist((set) => ({
        lastFetched: null,
        leveledQuestions: { low: [], mid: [], high: [] },
        hydrated: false,

        setLeveledQuestions: (questions: LeveledQuestionsData) => set({ leveledQuestions: questions, lastFetched: Date.now() }),
        setHydrated: (value: boolean) => set({ hydrated: value }),
    }), {
        name: "problems-storage",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        storage: createJSONStorage(() => sessionStorage),
    }),
);