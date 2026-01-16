import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        const {username, updatedChanges } = await req.json();
        if(!username || !updatedChanges) {
            return NextResponse.json({ message: "No changes provided" }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { username },
            { $set: { updatedSettings: updatedChanges } },
            { new: true }
        );

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log(user);

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving profile changes:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}