import { Questions } from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const codeforcesId = await req.json();
        if(!codeforcesId) {
            return NextResponse.json({ message: "Codeforces ID is required" }, { status: 400 });
        }

        const profileData = await Questions.findOne({ codeforcesId });
        if(!profileData) {
            return NextResponse.json({ message: "Profile data not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Successfully found the profileData", profileData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}