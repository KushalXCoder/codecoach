import { ProfileStore, profileStore } from "@/store/profile.store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { saveUserChanges } from "@/services/user.service";
import { toast } from "sonner";
import { useState } from "react";
import { ProfileData } from "@/lib/types/global.types";
import { ProfileDataResponse } from "@/services/profile.service";

// Note: After updating the dailyLimit and the rating, I would update the local store so that new leveledQuestions can be found,
// and then till redis has the cache, the user will see the dailyQuestions, can only see the new questions depending on the
// leveledQuestions, the next day or when the 24hr time ends in the cache for the user.

const Settings = () => {
    const { codeforcesId, rating, dailyLimit, updatedSettings, setUpdatedSettings, setRating, setDailyLimit } = profileStore();

    const [newRating, setNewRating] = useState<number>(rating ?? 0);
    const [newDailyLimit, setNewDailyLimit] = useState<number>(dailyLimit ?? 0);

    const handleSave = async () => {
        if(newRating === rating && newDailyLimit === dailyLimit) {
            toast.error("No changes to save");
            return;
        }

        const changes : Partial<ProfileData> = {
            rating: newRating,
            dailyLimit: newDailyLimit,
        };

        setUpdatedSettings(changes);

        const saveRes = await saveUserChanges(codeforcesId, changes);

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
                        defaultValue={updatedSettings.rating ? updatedSettings.rating : (rating ?? 0)}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="mt-2 text-primary"
                    />
                </div>
                <div>
                    <label className="text-gray-400 text-sm">Daily Problem Limit</label>
                    <Input
                        type="number"
                        defaultValue={updatedSettings.dailyLimit ? updatedSettings.dailyLimit : (dailyLimit ?? 0)}
                        onChange={(e) => setNewDailyLimit(Number(e.target.value))}
                        className="mt-2 text-primary"
                    />
                </div>
            </div>
            <Button onClick={handleSave} className="mt-3 w-30">Save</Button>
        </div>
    )
}

export default Settings;