"use client";

import userStore from "@/store/user.store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InfoChangeProps } from "@/lib/global.types";

type UserInfoProps = {
    changes: InfoChangeProps;
    setChanges: (changes: InfoChangeProps) => void;
};

const UserInfo = ({ changes, setChanges } : UserInfoProps) => {
    const { dailyLimit, codeforcesId } = userStore();
    
    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Codeforces Id</Label>
                <Input id="sheet-demo-name" defaultValue={codeforcesId} disabled />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Daily Limit</Label>
                <Input
                    type="number"
                    id="sheet-demo-username"
                    defaultValue={dailyLimit}
                    min="1" max="10"
                    onChange={(e) => setChanges({ ...changes, dailyLimit: Number(e.target.value) })}
                />
            </div>
        </div>
    )
}

export default UserInfo;