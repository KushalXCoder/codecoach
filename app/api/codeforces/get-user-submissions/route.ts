import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId } = await req.json();
        if(!codeforcesId) {
            return NextResponse.json({ message: "Codeforces ID is required" }, { status: 400 });
        }

        const res = await fetch(`https://codeforces.com/api/user.status?handle=${codeforcesId}&count=100`);

        const data = await res.json();
        if(!res.ok) {
            return NextResponse.json({ message: data.comment || "Failed to fetch user submissions" }, { status: res.status });
        }

        return NextResponse.json({ message: "Submissions fetched successfully", submissions: data.result }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}