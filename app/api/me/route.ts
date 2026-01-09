import checkToken from "@/lib/helper/checkToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token) {
            console.log("No token found in cookies");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = await checkToken(token);
        if(!decoded || decoded === null) {
            console.log("Invalid or expired token");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ message: "Authorized", user: decoded }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/me:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}