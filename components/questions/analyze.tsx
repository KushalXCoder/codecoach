"use client";

import SelectTopics from "@/components/analyze/select-topics";
import { Input } from "@/components/ui/input";
import { profileStore } from "@/store/profile.store";
import Username from "../analyze/username";
// import CodeforcesInput from "./codeforces-input";

const Analyze = () => {
    const { username, rating, setUsername, setRating } = profileStore();
    return (
        <div>
            <div className="flex flex-col gap-5 mt-3">
                {/* <CodeforcesInput /> */}
                <Username />
                <div className="flex flex-col gap-2 ">
                    <label className="text-white">Codeforces Rating</label>
                    <Input
                        type="number"
                        className="text-primary"
                        placeholder="2200"
                        value={rating || ""}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <SelectTopics type="experienced" />
                <SelectTopics type="improve" />
            </div>
        </div>
    )
}

export default Analyze;