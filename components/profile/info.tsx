"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { profileStore } from "@/store/profile.store";

const UserInfo = () => {
    const { rating, codeforcesId, dailyLimit, setRating, setCodeforcesId, setDailyLimit } = profileStore();
    
    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="grid gap-3">
                <Label htmlFor="codeforces-id">Codeforces Id</Label>
                <Input id="codeforces-id" defaultValue={codeforcesId} disabled />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="daily-limit">Daily Limit</Label>
                <Input
                    type="number"
                    id="daily-limit"
                    defaultValue={dailyLimit ?? 0}
                    min="1" max="10"
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="rating">Rating</Label>
                <Input
                    type="number"
                    id="rating"
                    defaultValue={rating ?? 0}
                    min="1" max="10"
                    onChange={(e) => setRating(Number(e.target.value))}
                />
            </div>
        </div>
    )
}

export default UserInfo;