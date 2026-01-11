import { QuestionsData } from "@/lib/types/global.types";
import { Questions } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        const { codeforcesId, updatedTodaysQuestions } = await req.json();
        if(!codeforcesId || !updatedTodaysQuestions) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const solvedCnt = updatedTodaysQuestions.filter((q: QuestionsData) => q.solved).length;

        const user = await Questions.findOne({ codeforcesId });

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.todaysQuestions = updatedTodaysQuestions;
        user.solvedQuestions = user.solvedQuestions + solvedCnt;

        const saved = await user.save();
        if(!saved) {
            return NextResponse.json({ message: "Failed to update questions" }, { status: 500 });
        }

        return NextResponse.json({ message: "Questions updated successfully", user }, { status: 200 });
    } catch (error) {
        console.error("Error updating questions:", error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}