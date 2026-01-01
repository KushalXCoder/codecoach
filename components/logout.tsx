import { userLogout } from "@/services/user.service"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { profileStore } from "@/store/profile.store";

const Logout = () => {
    const router = useRouter();
    const { reset } = profileStore();

    const handleLogout = async () => {
        const data = await userLogout();

        if(data.success) {
            reset();
            router.push('/');
            toast(data.message || "Logged out successfully");
        } else {
            toast.error(data.message || "Logout failed");
        }
    }
    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}

export default Logout;