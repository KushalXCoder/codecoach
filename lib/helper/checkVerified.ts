"use server";

import { cookies } from "next/headers";
import checkCfToken from "./checkCfToken";
import { JWTCfPayload } from "../types/global.types";

export const checkVerified = async () : Promise<JWTCfPayload> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("verified")?.value;

    if (!token) {
        return { verified: false, codeforcesId: "" };
    }

    const decoded = await checkCfToken(token);

    if (!decoded) {
        return { verified: false, codeforcesId: "" };
    }

    return decoded;
}