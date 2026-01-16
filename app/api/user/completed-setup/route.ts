import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        const { username } = await req.json();
        
        if(!username) {
            return NextResponse.json({ message: "username is required" }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { username },
            { setupCompleted: true },
            { new: true }
        );

        if(!user) {
            console.error("User not found when marking setup as completed");
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Setup marked as completed" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/user/completed-setup:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}