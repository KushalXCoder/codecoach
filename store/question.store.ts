import { create } from "zustand";

type QuestionStore = {
    idx: number;
    setIdx: (idx: number) => void;
    saving: boolean;
    setSaving: (val: boolean) => void;
}

export const questionStore = create<QuestionStore>((set) => ({
    idx: 0,
    setIdx: (idx: number) => set({ idx: idx }),
    saving: false,
    setSaving: (val: boolean) => set({ saving: val }),
}));