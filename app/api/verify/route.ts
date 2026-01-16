import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId } = await req.json();
        if(!codeforcesId) {
            return NextResponse.json({message: "Codeforces ID is required"}, {status: 400});
        }

        const res = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesId}`);

        const data = await res.json();
        if(!res.ok) {
            return NextResponse.json({ message: "Error fetching user info" }, { status: 500 });
        }

        if(data.result[0].organization !== "CodeCoach") {
            return NextResponse.json({ message: "Verification failed. Organization does not match." }, { status: 400 });
        }

        const response = NextResponse.json({ message: "Verification successful" }, { status: 200 });

        const token = jwt.sign({ verified: true }, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
        response.cookies.set('verified', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}