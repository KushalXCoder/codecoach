import { LeveledQuestionsData, QuestionsData, RankedData } from "@/lib/types/global.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProblemsStore = {
    lastFetched: number | null;
    hydrated: boolean;
    leveledQuestions: LeveledQuestionsData;
    todaysQuestions: QuestionsData[];

    setLeveledQuestions: (bands: LeveledQuestionsData) => void;
    setTodaysQuestions: (questions: QuestionsData[]) => void;
    setHydrated: (value: boolean) => void;
};

export const problemsStore = create<ProblemsStore>()(
    persist((set) => ({
        lastFetched: null,
        leveledQuestions: { low: [], mid: [], high: [] },
        todaysQuestions: [],
        hydrated: false,

        setLeveledQuestions: (questions: LeveledQuestionsData) => set({ leveledQuestions: questions, lastFetched: Date.now() }),
        setTodaysQuestions: (questions: QuestionsData[]) => set({ todaysQuestions: questions }),
        setHydrated: (value: boolean) => set({ hydrated: value }),
    }), {
        name: "problems-storage",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        storage: createJSONStorage(() => sessionStorage),
    }),
);