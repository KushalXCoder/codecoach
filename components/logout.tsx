import { userLogout } from "@/services/user.service"
import { Button } from "./ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner";
import { profileStore } from "@/store/profile.store";
import { cn } from "@/lib/utils";
import { problemsStore } from "@/store/problems.store";

type LogoutProps = {
    className: string;
};

const Logout = ({ className } : LogoutProps) => {
    const router = useRouter();

    const { reset: questionsReset } = problemsStore();
    const { reset: profileReset } = profileStore();

    const handleLogout = async () => {
        const data = await userLogout();

        if(data.success) {
            // Reset the store
            questionsReset();
            profileReset();

            // Push to home
            router.push('/');

            // Display toast
            toast(data.message || "Logged out successfully");
        } else {
            toast.error(data.message || "Logout failed");
        }
    }
    return (
        <Button
            variant="destructive"
            className={cn("w-full cursor-pointer", className)}
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}

export default Logout;