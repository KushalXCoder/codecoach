import checkProfileToken from "@/lib/helper/checkProfileToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const profileToken = cookieStore.get("profile-token")?.value;

        if(!profileToken) {
            return NextResponse.json({ message: "No profile token found", decoded: null }, { status: 401 });
        }

        const decoded = await checkProfileToken(profileToken);
        if(!decoded || decoded === null) {
            return NextResponse.json({ message: "Invalid profile token", decoded: null }, { status: 401 });
        }

        return NextResponse.json({ message: "Profile token valid", decoded }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/profile/token:", error);
        return NextResponse.json({ message: "Internal Server Error", decoded: null }, { status: 500 });
    }
}