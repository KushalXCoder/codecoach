import { profileStore } from "@/store/profile.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { saveUserChanges } from "@/services/user.service";
import { toast } from "sonner";

const Settings = () => {
    const { codeforcesId, rating, dailyLimit, updatedChanges, setUpdatedChanges } = profileStore();
    console.log("Updated Changes:", updatedChanges);

    const handleSave = async () => {
        if(updatedChanges.rating === rating && updatedChanges.dailyLimit === dailyLimit) {
            toast.error("No changes to save");
            return;
        }
        
        const saveRes = await saveUserChanges(codeforcesId, updatedChanges);

        if(!saveRes.success) {
            toast.error(saveRes.message || "Failed to save changes");
            return;
        }

        toast.success(saveRes.message || "Changes saved successfully");
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="text-gray-400 text-sm">Your Rating</label>
                    <Input
                        type="number"
                        defaultValue={rating ?? 0}
                        onChange={(e) => setUpdatedChanges({ rating: Number(e.target.value) })}
                        className="mt-2 text-primary"
                    />
                </div>
                <div>
                    <label className="text-gray-400 text-sm">Daily Problem Limit</label>
                    <Input
                        type="number"
                        defaultValue={dailyLimit ?? 0}
                        onChange={(e) => setUpdatedChanges({ dailyLimit: Number(e.target.value) })}
                        className="mt-2 text-primary"
                    />
                </div>
            </div>
            <Button onClick={handleSave} className="mt-3 w-30">Save</Button>
        </div>
    )
}

export default Settings;