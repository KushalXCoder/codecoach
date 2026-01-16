"use client";

import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchProfileToken } from "@/services/user.service";

// export const fetchMe = async () => {
//     const res = await fetch("/api/me", {
//         credentials: "include",
//     });

//     const data = await res.json();
//     if(!res.ok) {
//         throw new Error("Failed to fetch user");
//     }

//     return data;
// };

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const { setUsername, setRating, setDailyLimit, setExperiencedTopics, setImproveTopics, setUpdatedSettings } = profileStore();
    const router = useRouter();
    const pathname = usePathname();

    // const { data: user, isError, error } = useQuery({
    //     queryKey: ["me"],
    //     queryFn: fetchMe,
    //     retry: false,
    // });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfileToken,
        retry: false,
    });

    useEffect(() => {
        if(isLoading) return;

        if(isError || !data) {
            router.push('/profile-setup');
        };

        if(data) {
            const user = data.decoded.data;
            
            // if(!use.setupCompleted) {
            //     router.push('/profile-setup');
            //     return;
            // }
    
            // setCodeforcesId(data.profileData.codeforcesId);
            setUsername(user.username);
            setRating(user.rating);
            setDailyLimit(user.dailyLimit);
            setImproveTopics(user.improveTopics);
            setExperiencedTopics(user.experiencedTopics);
            setUpdatedSettings(user.updatedSettings);  
        }
    }, [data]);

    return children;
}