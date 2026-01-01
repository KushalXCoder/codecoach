import connectDB from "@/lib/connectDb";
import { RankedData } from "@/lib/global.types";
import { Questions } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        await connectDB();

        const { codeforcesId, problems } = await req.json();
        if(!problems) {
            return NextResponse.json({ success: false, message: "No problems provided" }, { status: 400 });
        }
        
        const user = await Questions.findOne({ codeforcesId });
        if (user) {
            const existingIds = new Set(
                user.questions.map((q: RankedData) => q.problem._id.toString()),
            );

            const newQuestions : RankedData[] = [];

            for(let p of problems) {
                if(!existingIds.has(p.problem._id.toString())) {
                    newQuestions.push(p);
                }
            }

            user.questions = [...user.questions, ...newQuestions];
            await user.save();

            return NextResponse.json({ message: "Problems updated successfully" }, { status: 200 });
        }

        const newUser = await Questions.create({
            codeforcesId,
            questions: problems,
        });

        if(!newUser) {
            return NextResponse.json({ message: "Failed to save problems" }, { status: 500 });
        }

        return NextResponse.json({ message: "Problems saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error saving problems:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}