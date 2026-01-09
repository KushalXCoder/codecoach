"use server";

import { cookies } from "next/headers";
import checkCfToken from "./checkCfToken";

export const checkVerified = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("verified")?.value;

    if (!token) {
        return false;
    }

    const decoded = await checkCfToken(token);

    if (!decoded) {
        return false;
    }

    return decoded.verified;
}