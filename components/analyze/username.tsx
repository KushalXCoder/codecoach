import { profileStore } from "@/store/profile.store";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUsername } from "@/services/profile.service";

const Username = () => {
    const { username, setUsername, setUsernameVerified } = profileStore();
    const [localUsername, setLocalUsername] = useState(username);
    const [debouncedUsername, setDebouncedUsername] = useState(username);

    // Apply debouncing and check for the username validity
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedUsername(localUsername);
            setUsername(localUsername);
        }, 500);

        return () => clearTimeout(timer);
    }, [localUsername, setUsername]);

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['check-username', debouncedUsername],
        queryFn: () => checkUsername(debouncedUsername),
        staleTime: 0,
        enabled: debouncedUsername.length > 0,
    });

    useEffect(() => {
        if(data !== undefined) {
            setUsernameVerified(data.isValid);
            console.log(data.isValid);
        }
    }, [data, setUsernameVerified]);

    if(isError) {
        console.log(error);
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-white">Username</label>
            <Input
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                placeholder="John Doe"
                className="text-primary"
            />
            {isFetching && <p className="text-gray-500 text-sm">Checking username...</p>}
            {isError && <p className="text-red-500 text-sm">Error checking username.</p>}
            {data && (
                <p
                    className={`text-sm ${
                        data.isValid ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {data.isValid ? "Username available" : "Username taken"}
                </p>
            )}
        </div>
    )
}

export default Username;