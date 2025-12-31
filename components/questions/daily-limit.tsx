import { Input } from "../ui/input";
import Navigator from "./navigator";
import { profileStore } from "@/store/profile.store";

const DailyLimit = () => {
    const { dailyLimit, setDailyLimit } = profileStore();
    return (
        <div className="w-2/4 flex flex-col">
            <h1 className="text-primary text-lg">Set your daily questions limit</h1>
            <Input
                type="number"
                min={1} max={10}
                placeholder="Enter you number"
                className="w-full text-white mt-1"
                value={dailyLimit || ""}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
            />
            <Navigator />
        </div>
    )
}

export default DailyLimit;