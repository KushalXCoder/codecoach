"use client";

import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const fetchMe = async () => {
    const res = await fetch("/api/me", {
        credentials: "include",
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error("Failed to fetch user");
    }

    return data;
};

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const { setCodeforcesId, setRating, setDailyLimit, setExperiencedTopics, setImproveTopics, setUpdatedSettings } = profileStore();
    const router = useRouter();
    const pathname = usePathname();

    const { data: user, isError } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        retry: false,
    });

    useEffect(() => {
        if(user && pathname !== '/') {
            const data = user.user.data;
            
            if(!data.setupCompleted) {
                router.push('/profile-setup');
                return;
            }

            setCodeforcesId(data.profileData.codeforcesId);
            setRating(data.profileData.rating);
            setDailyLimit(data.profileData.dailyLimit);
            setImproveTopics(data.profileData.improveTopics);
            setExperiencedTopics(data.profileData.experiencedTopics);
            setUpdatedSettings(data.profileData.updatedSettings);
        }
    }, [user]);

    return children;
}