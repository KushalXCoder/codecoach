import { create } from "zustand";

type QuestionStore = {
    idx: number;
    setIdx: (idx: number) => void;
}

export const questionStore = create<QuestionStore>((set) => ({
    idx: 0,
    setIdx: (idx: number) => set({ idx: idx }),
}));