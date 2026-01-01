import { profile } from 'console';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserStore = {
    codeforcesId: string,
    email: string,
    justRegistered: boolean,
    profileCompleted: boolean,
    hydrated: boolean,
    
    setCodeforcesId: (id: string) => void,
    setEmail: (val: string) => void,
    setJustRegistered: (val: boolean) => void,
    setProfileCompleted: (val: boolean) => void,
    setHydrated: (val: boolean) => void,
}

const userStore = create<UserStore>()(
    persist(set => ({
        email: '',
        codeforcesId: '',
        justRegistered: false,
        profileCompleted: false,
        hydrated: false,
        
        setCodeforcesId: (id) => set({ codeforcesId: id }),
        setEmail: (val: string) => set({ email: val }),
        setJustRegistered: (val) => set({ justRegistered: val }),
        setProfileCompleted: (val: boolean) => set({ profileCompleted: val }),
        setHydrated: (val: boolean) => set({ hydrated: val }),
    }), {
        name: "user-store",
        onRehydrateStorage: () => (state) => {
            state?.setHydrated(true);
        },
        partialize: (state) => ({
            codeforcesId: state.codeforcesId,
            profileCompleted: state.profileCompleted,
            hydrated: state.hydrated,
        }),
        storage: createJSONStorage(() => localStorage),
    }
    ));

export default userStore;