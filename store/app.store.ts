import { create } from "zustand";

type AppStore = {
    openCodeforcesDialog: boolean;
    setOpenCodeforcesDialog: (open: boolean) => void;
}

export const appStore = create<AppStore>((set) => ({
    openCodeforcesDialog: false,
    setOpenCodeforcesDialog: (open: boolean) => set({ openCodeforcesDialog: open }),
}));