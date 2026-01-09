"use client";

import { fetchMe } from "@/lib/provider/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
    const router = useRouter();
    
    const { data } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        retry: false,
    });

    useEffect(() => {
        if(data) {
            console.log(data);
            const user = data.user.data;

            if(user.setupCompleted) {
                router.push('/problems');
            } else {
                router.push('/profile-setup');
            }
        }
    },[data]);


    return (
        <div className="h-screen flex justify-center items-center text-white font-sans">
            <div className="border border-gray-500 p-5 rounded-lg max-w-xl">
                <h1 className="text-primary text-xl">Authenticating....</h1>
                <p className="mt-1">Please wait for a moment, we are processing your authentication. This would make your experience seamless.</p>
                <p className="text-blue-500 mt-5">Happy Coding!</p>
            </div>
        </div>
    )
}

export default AuthCallbackPage;