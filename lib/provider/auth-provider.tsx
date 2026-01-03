"use client";

import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchMe = async () => {
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

    const { data: user, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        retry: false,
    });

    useEffect(() => {
        if(user) {
            const data = user.user.data;
            setCodeforcesId(data.codeforcesId);
            setRating(data.rating);
            setDailyLimit(data.dailyLimit);
            setImproveTopics(data.improveTopics);
            setExperiencedTopics(data.experiencedTopics);
        }
    }, [user]);

    return children;
}