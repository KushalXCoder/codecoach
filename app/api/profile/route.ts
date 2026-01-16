import connectDB from "@/lib/provider/connectDb";
import { Questions } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const username = await req.json();
        if(!username) {
            return NextResponse.json({ message: "Username is required" }, { status: 400 });
        }

        await connectDB();

        const profileData = await Questions.findOne({ username });
        if(!profileData) {
            return NextResponse.json({ message: "Profile data not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Successfully found the profileData", profileData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}