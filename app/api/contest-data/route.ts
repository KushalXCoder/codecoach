import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId } = await req.json();
        
        if(!codeforcesId) {
            return NextResponse.json({ message: "Codeforces Id is missing" }, { status: 400 });
        }

        const res = await fetch(`${process.env.API_URI}/user.rating?handle=${codeforcesId}`, {
            cache: "no-cache",
        });

        if(!res.ok) {
            return NextResponse.json({ message: "Error fetching user contest data" }, { status: 400 });
        }

        const data = await res.json();
        return NextResponse.json({ message: "User contest data", data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}