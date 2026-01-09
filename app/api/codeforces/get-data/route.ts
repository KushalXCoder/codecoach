import connectDB from "@/lib/provider/connectDb";
import { QuestionsData } from "@/lib/types/global.types";
import { Problems } from "@/models/problems.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();

        const res = await fetch('https://codeforces.com/api/problemset.problems');

        const data = await res.json();
        if(!res.ok) {
            return NextResponse.json({ message: "Failed to fetch questions from codeforces" }, { status: 500 });
        }

        const problems = data.result.problems.filter(
            (p: QuestionsData) => typeof p.rating === "number"
        );

        await Problems.create(problems);

        if(!problems) {
            return NextResponse.json({ message: "Failed to store questions in database" }, { status: 400 });
        }

        return NextResponse.json({ message: "Questions fetched successfully", data: problems }, { status: 200 });
    } catch (error) {
        console.error("Error fetching questions from codeforces:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}