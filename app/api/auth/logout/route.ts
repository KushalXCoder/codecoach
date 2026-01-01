import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const res = NextResponse.json({ message: "Logout Successful" }, { status: 200 });

        res.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
            path: '/',
        });

        return res;
    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}