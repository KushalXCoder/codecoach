import connectDB from "@/lib/provider/connectDb";
import { Questions } from "@/models/questions.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId } = await req.json();
        if(!codeforcesId) {
            return NextResponse.json({ success: false, message: "Codeforces ID is required" }, { status: 400 });
        }

        await connectDB();

        const user = await Questions.findOne({ codeforcesId });
        if(!user) {
            const user = await User.findOne({ codeforcesId });
            if(!user) {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }

            await Questions.create({
                codeforcesId,
                questions: [],
                todaysQuestions: [],
                solvedQuestions: [],
            });

            return NextResponse.json({ message: "User questions found", data: [] }, { status: 200 });
        }

        return NextResponse.json({ message: "User questions found", data: user.questions }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user previous questions:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}