"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe } from "@/lib/provider/auth-provider";

const StartButton = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: user, refetch } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        enabled: false,
        retry: false,
    });

    const handleClick = async () => {
        await refetch();

        if(user) {
            const data = user.user.data;
            if(!data.setupCompleted) {
                router.push('/profile-setup');
            } else {
                router.push('/problems');
            }
        }
    }

    return (
        <Button
            className="mb-12 relative px-5 py-5 bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/50"
            onClick={handleClick}
        >
            <span className="relative z-10">Start Coding Today</span>
        </Button>
    )
}

export default StartButton;