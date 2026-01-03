import connectDB from "@/lib/provider/connectDb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        if(!email || !password) {
            return NextResponse.json({ message: "Missing details" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email });

        if(!user) {
            const hashedPassword = await bcrypt.hash(password,10);
            
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            const res = NextResponse.json({ message: 'User registered', status: "Success", newUser }, { status: 200 });

            const token = jwt.sign({ data: newUser }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });

            res.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60,
            });

            return res;
        }

        return NextResponse.json({ message: 'User already exists', status: "Exists" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', status: "Error", error }, { status: 500 });
    }
}