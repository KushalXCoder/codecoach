import checkToken from "@/lib/helper/checkToken";
import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const decoded = await checkToken(token!);

        const { codeforcesId } = await req.json();

        if(!codeforcesId) {
            return NextResponse.json({ message: "Codeforces id is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: (decoded as JwtPayload).data.email });

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.codeforcesId = codeforcesId;

        await user.save();

        return NextResponse.json({ message: "Codeforces id saved successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}