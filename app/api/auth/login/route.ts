import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!email || !password) {
            return NextResponse.redirect(
                new URL("/login?error=missing", req.nextUrl.origin)
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if(!user) {
            return NextResponse.redirect(
                new URL("/login?error=invalid", req.nextUrl.origin)
            );
        }

        const userPassword = user.password;

        const isPassword = await bcrypt.compare(password, userPassword);

        if(!isPassword) {
            return NextResponse.redirect(
                new URL("/login?error=invalid", req.nextUrl.origin)
            );
        }

        // Create the token data
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
                    updatedSettings: user.updatedSettings,
                }
            }
        }

        console.log("Token Data:", tokenData);

        // Sign the token using JWT
        const token = jwt.sign(tokenData, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });
        
        // const res = NextResponse.json({ message: "Login Successful", tokenData }, { status: 200 });
        const res = NextResponse.redirect(new URL('/auth/callback', req.nextUrl.origin), 303);

        // Attach cookie with the response
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60,
            path: '/',
        });

        return res;
        
    } catch (error) {
        return NextResponse.redirect(
            new URL("/login?error=server", req.nextUrl.origin)
        );
    }
}