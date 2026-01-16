import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import checkToken from "./lib/helper/checkToken";
import checkProfileToken from "./lib/helper/checkProfileToken";

export const proxy = async (req: NextRequest) => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("profile-token");

    if(!cookie) {
        return NextResponse.redirect(new URL("/profile-setup", req.url));
    }

    const token = cookie?.value;
    if(!token) {
        return NextResponse.redirect(new URL("/profile-setup", req.url));
    }

    const decoded = checkProfileToken(token);
    if(decoded === null) {
        return NextResponse.redirect(new URL("/profile-setup", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/problems, /profile"],
}