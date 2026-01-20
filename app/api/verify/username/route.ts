import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const username = await req.json();
        if(!username) {
            return NextResponse.json({ message: 'Username is required' }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ username });
        if(!user) {
            return NextResponse.json({ message: "User not found", isValid: true }, { status: 200 });
        }

        return NextResponse.json({ message: "Username exists", isValid: false }, { status: 200 });
    } catch (error) {
        console.error("Error verifying username:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}