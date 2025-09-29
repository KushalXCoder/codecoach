import connectDB from "@/lib/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

        return NextResponse.json({ message: "Login Successful", user }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}