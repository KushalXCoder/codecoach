import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
    try {
        const { profileData } = await req.json();
        console.log("Received profile data:", profileData);
        if(!profileData) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        await connectDB();

        // Save user to DB
        const user = await User.findOne({ "profileData.username": profileData.username });
        if(user) {
            console.error("User already exists:");
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        await User.create(profileData);

        // Set profile token cookie
        const payload = {
            data: {
                ...profileData,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '30d',
        });

        const res = NextResponse.json({ message: "Profile created successfully" }, { status: 200 });

        res.cookies.set({
            name: "profile-token",
            value: token,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
        });

        return res;
    } catch (error) {
        console.error("Error in save-profile route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}