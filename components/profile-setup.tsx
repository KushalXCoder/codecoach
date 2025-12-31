"use client";

import DailyLimit from "./questions/daily-limit";
import AnalyzeProfile from "./questions/analyze-profile";
import { questionStore } from "@/store/question.store";

const ProfileSetup = () => {
    const { idx } = questionStore();
    const renderStep = () => {
        switch(idx) {
            case 0:
                return <DailyLimit />
            case 1:
                return <AnalyzeProfile />
            default:
                return <div>Invalid Step</div>
        }
    };


    return (
        <div className="flex flex-col items-center font-sans mt-30">
            {renderStep()}
        </div>
    )
}

export default ProfileSetup;