"use client";

// import { fetchMe } from "@/lib/provider/auth-provider";
import { fetchProfileToken } from "@/services/user.service";
import { profileStore } from "@/store/profile.store";
import userStore from "@/store/user.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
    const router = useRouter();
    const { hydrateFromServer } = profileStore();
    // const { setProfileCompleted } = userStore();
    
    // const { data } = useQuery({
    //     queryKey: ['me'],
    //     queryFn: fetchMe,
    //     retry: false,
    // });

    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfileToken,
        retry: false,
    });

    useEffect(() => {
        if(!data?.decoded || data.decoded === null) return;

        console.log(data);
        const user = data.decoded.data;

        // console.log("User setup completed:", user.setupCompleted);
        
        // Update the global state with user profile information
        // setProfileCompleted(user.setupCompleted);

        console.log(user);
        hydrateFromServer(user);

        // if(user.setupCompleted) {
        //     router.push('/problems');
        // } else {
        //     router.push('/profile-setup');
        // }

        router.push('/problems');
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