import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import checkToken from "./lib/checkToken";

export const middleware = async (req: NextRequest) => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("token");

    if(!cookie) {
        return NextResponse.redirect(new URL("/auth/register", req.url));
    }

    const token = cookie?.value;
    if(!token) {
        return NextResponse.redirect(new URL("/auth/register", req.url));
    }

    const decoded = checkToken(token);
    if(decoded === null) {
        return NextResponse.redirect(new URL("/auth/register", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
}