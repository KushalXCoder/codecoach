import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        await connectDB();

        const { profileData, codeforcesId } = await req.json();
        if(!profileData || !codeforcesId) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        console.log("Received data to save:", codeforcesId, profileData);

        const updateUser = await User.findOneAndUpdate(
            { codeforcesId },
            { ...profileData },
            { new: true }
        );

        if(!updateUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in save-data route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}