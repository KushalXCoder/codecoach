import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        if(!email || !password) {
            return NextResponse.json({ message: "Email or Password missing" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email });

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const userPassword = user.password;

        const isPassword = await bcrypt.compare(password, userPassword);

        if(!isPassword) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
        }

        const tokenData = {
            data: {
                email: user.email,
                setupCompleted: user.setupCompleted,
                profileData: {
                    codeforcesId: user.codeforcesId,
                    dailyLimit: user.dailyLimit,
                    rating: user.rating,
                    improveTopics: user.improveTopics,
                    experiencedTopics: user.experiencedTopics,
                }
            }
        }

        const res = NextResponse.json({ message: "Login Successful", tokenData }, { status: 200 });

        const token = jwt.sign(tokenData, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });
        
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60,
            path: '/',
        });

        return res;
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}