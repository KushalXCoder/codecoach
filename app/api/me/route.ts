import checkProfileToken from "@/lib/helper/checkProfileToken";
import checkToken from "@/lib/helper/checkToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decode } from "punycode";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("profile-token")?.value;

        if(!token) {
            console.log("No token found in cookies");
            return NextResponse.json({ message: "Unauthorized", decoded: null }, { status: 401 });
        }

        // const decoded = await checkToken(token);
        const decoded = await checkProfileToken(token);
        if(!decoded || decoded === null) {
            console.log("Invalid or expired token");
            return NextResponse.json({ message: "Unauthorized", decoded: null }, { status: 401 });
        }

        return NextResponse.json({ message: "Authorized", decoded }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/me:", error);
        return NextResponse.json({ message: "Internal Server Error", decoded: null }, { status: 500 });
    }
}