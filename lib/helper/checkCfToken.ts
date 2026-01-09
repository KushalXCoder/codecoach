import jwt, { JwtPayload as JwtLibPayload } from "jsonwebtoken";
import { JWTCfPayload } from "../types/global.types";

const checkCfToken = async (token: string) : Promise<JWTCfPayload | null> => {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtLibPayload | string;
        if (typeof decoded === "string") {
            return null;
        }
        return decoded as JWTCfPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default checkCfToken;