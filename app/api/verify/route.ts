import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId } = await req.json();

        if(!codeforcesId) {
            return NextResponse.json({message: "Codeforces ID is required"}, {status: 400});
        }

        const res = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesId}`);

        if(res.ok) {
            const data = await res.json();
            return NextResponse.json({ message: "User data", data }, { status: 200 });
        }

        return NextResponse.json({ message: "Error fetching user info" }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}