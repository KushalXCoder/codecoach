import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserStore = {
    codeforcesId: string,
    setCodeforcesId: (id: string) => void,
    email: string,
    setEmail: (val: string) => void,
    justRegistered: boolean,
    setJustRegistered: (val: boolean) => void,
    profileCompleted: boolean,
    setProfileCompleted: (val: boolean) => void,
}

const userStore = create<UserStore>()(
    persist(set => ({
        codeforcesId: '',
        setCodeforcesId: (id) => set({ codeforcesId: id }),
        email: '',
        setEmail: (val: string) => set({ email: val }),
        justRegistered: false,
        setJustRegistered: (val) => set({ justRegistered: val }),
        profileCompleted: false,
        setProfileCompleted: (val: boolean) => set({ profileCompleted: val }),
    }), {
        name: "user-store",
        partialize: (state) => ({
            codeforcesId: state.codeforcesId,
        }),
        storage: createJSONStorage(() => localStorage),
    }
    ));

export default userStore;