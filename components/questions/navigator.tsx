"use client";

import { questionStore } from "@/store/question.store";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { profileStore } from "@/store/profile.store";
import { toast } from "sonner";
import { saveData } from "@/services/user.service";
import userStore from "@/store/user.store";
import { useRouter } from "next/navigation";

type NavigatorProps = {
    className?: string,
};

const Navigator = ({ className } : NavigatorProps) => {
    const { setProfileCompleted, codeforcesId } = userStore();
    const { dailyLimit, rating, experiencedTopics, improveTopics, validateStep } = profileStore();
    const { idx, setIdx } = questionStore();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        const result = validateStep(idx);

        if(!result.valid) {
            toast(result.message || "Please fill the required fields");
            setLoading(false);
            return;
        }
        
        if(idx === 1) {
            const profileData = { dailyLimit, rating, experiencedTopics, improveTopics};

            setLoading(true);
            const data = await saveData(profileData, codeforcesId!);

            if(!data.success) {
                toast(data.message || "Could not save profile data");
                setLoading(false);
                return;
            }

            setLoading(false);

            toast("Profile setup completed!");
            setProfileCompleted(true);
            router.push('/problems');
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