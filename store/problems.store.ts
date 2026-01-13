import { LeveledQuestionsData, QuestionsData, RankedData } from "@/lib/types/global.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProblemsStore = {
    hydrated: boolean;
    leveledQuestions: LeveledQuestionsData;
    todaysQuestions: QuestionsData[];

    setLeveledQuestions: (bands: LeveledQuestionsData) => void;
    setTodaysQuestions: (questions: QuestionsData[]) => void;
    setHydrated: (value: boolean) => void;
    reset: () => void;
};

const initalData = {
    leveledQuestions: { low: [], mid: [], high: [] },
    todaysQuestions: [],
    hydrated: false,
};

export const problemsStore = create<ProblemsStore>()(
    persist((set) => ({
        ...initalData,

        setLeveledQuestions: (questions: LeveledQuestionsData) => set({ leveledQuestions: questions }),
        setTodaysQuestions: (questions: QuestionsData[]) => set({ todaysQuestions: questions }),
        setHydrated: (value: boolean) => set({ hydrated: value }),
        reset: () => set({ ...initalData }),
    }), {
        name: "problems-storage",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        partialize: (state) => ({
            leveledQuestions: state.leveledQuestions,
            hydrated: state.hydrated,
        }),
        storage: createJSONStorage(() => sessionStorage),
    }),
);