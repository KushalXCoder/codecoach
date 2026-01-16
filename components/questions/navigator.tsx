"use client";

import { questionStore } from "@/store/question.store";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { profileStore } from "@/store/profile.store";
import { toast } from "sonner";
import { fetchProfileToken, markSetupCompleted, saveProfile } from "@/services/user.service";
import userStore from "@/store/user.store";
import { useRouter } from "next/navigation";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
// import { fetchMe } from "@/lib/provider/auth-provider";

type NavigatorProps = {
    className?: string,
};

const Navigator = ({ className } : NavigatorProps) => {
    const { setProfileCompleted } = userStore();
    const { username, dailyLimit, rating, experiencedTopics, improveTopics, validateStep, hydrateFromServer } = profileStore();
    const { idx, setIdx } = questionStore();
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = async () => {
        const result = validateStep(idx);
        
        if(!result.valid) {
            toast(result.message || "Please fill the required fields");
            setLoading(false);
            return;
        }
        
        if(idx === 1) {
            const profileData = { username, dailyLimit, rating, experiencedTopics, improveTopics };

            setLoading(true);
            // const data = await saveData(profileData);

            // if(!data.success) {
            //     toast(data.message || "Could not save profile data");
            //     setLoading(false);
            //     return;
            // }

            // Set the profile 
            const profileRes = await saveProfile(profileData);
            if(!profileRes.success) {
                toast(profileRes.message || "Could not set profile token");
                return;
            }

            setLoading(false);
            setProfileCompleted(true);

            // Refresh token cookie
            // await fetch('/api/token/refresh-token', {
            //     method: 'POST',
            //     body: JSON.stringify({ profileData }),
            //     credentials: 'include',
            // });

            // const profileRes = await fetch('/api/profile/save-profile', {
            //     method: 'POST',
            //     body: JSON.stringify({ profileData }),
            //     credentials: 'include',
            // });

            // To ensure that we have the latest user data, after updating the cookie
            queryClient.removeQueries({ queryKey: ['profile'] });

            const freshData = await queryClient.fetchQuery({
                queryKey: ['profile'],
                queryFn: fetchProfileToken,
            });

            console.log("Fresh Data:", freshData);
            hydrateFromServer(freshData.decoded.data);

            // Store to the DB that setup is completed
            const res = await markSetupCompleted(username);
            if(!res.success) {
                toast(res.message || "Could not mark setup as completed");
                return;
            }

            router.push('/auth/callback');
            
            toast("Profile setup completed!");
        } else {
            setIdx(idx + 1);
        }
    }
    return (
        <div className={cn("flex items-center gap-3 mt-3 *:cursor-pointer", className)}>
            <Button
                variant="ghost"
                className="w-1/4 border text-white"
                disabled={idx === 0 || loading}
                onClick={() => setIdx(idx - 1)}
            >
                Previous
            </Button>
            <Button
                className="w-1/4"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? 'Saving...' : idx === 1 ? 'Finish' : 'Next'}
            </Button>
        </div>
    )
}

export default Navigator;
