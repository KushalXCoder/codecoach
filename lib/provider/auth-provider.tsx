"use client";

import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    const { setCodeforcesId, setRating, setDailyLimit, setExperiencedTopics, setImproveTopics } = profileStore();
    const router = useRouter();

    const { data: user } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        enabled: false,
        retry: false,
    });

    useEffect(() => {
        if(user) {
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
        }
    }, [user]);

    return children;
}