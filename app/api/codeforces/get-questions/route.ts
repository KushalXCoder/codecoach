import connectDB from "@/lib/connectDb";
import { Problems } from "@/models/problems.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();

        const { ratingLow, ratingHigh } = await req.json();

        const results = await Problems.find({
            rating: { $gte: ratingLow, $lte: ratingHigh },
        }).lean();

        if(!results) {
            return NextResponse.json({ message: "No questions found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Questions retrieved successfully", data: results }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving questions from database:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });   
    }
}