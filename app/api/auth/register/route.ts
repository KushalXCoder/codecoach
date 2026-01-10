import connectDB from "@/lib/provider/connectDb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!email || !password) {
            return NextResponse.redirect(
                new URL("/auth/login?error=missing", req.url)
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if(!user) {
            const hashedPassword = await bcrypt.hash(password,10);
            
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            // const res = NextResponse.json({ message: 'User registered', status: "Success", newUser }, { status: 200 });
            const res = NextResponse.redirect(new URL('/auth/callback', req.url));

            const tokenData = {
                email: newUser.email,
                setupCompleted: false,
            };

            const token = jwt.sign({ data: tokenData }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });

            res.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60,
            });

            return res;
        }

        return NextResponse.redirect(
            new URL("/auth/login?error=exists", req.url)
        );
    } catch (error) {
        return NextResponse.redirect(
            new URL("/auth/login?error=server", req.url)
        );
    }
}