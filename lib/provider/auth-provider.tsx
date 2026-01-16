"use client";

import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfileToken } from "@/services/user.service";

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const { setUsername, setRating, setDailyLimit, setExperiencedTopics, setImproveTopics, setUpdatedSettings } = profileStore();
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfileToken,
        retry: false,
    });

    useEffect(() => {
        if(isLoading) return;

        if(isError || !data || data.decoded === null) {
            router.push('/profile-setup');
            return;
        };

        if(data) {
            const user = data.decoded.data;
            
            setUsername(user.username);
            setRating(user.rating);
            setDailyLimit(user.dailyLimit);
            setImproveTopics(user.improveTopics);
            setExperiencedTopics(user.experiencedTopics);
            setUpdatedSettings(user.updatedSettings);  
        }
    }, [data, isLoading, isError]);

    return children;
}