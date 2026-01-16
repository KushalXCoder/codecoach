import jwt, { JwtPayload as JwtLibPayload } from "jsonwebtoken";
import { JWTPayload, JWTProfilePayload } from "../types/global.types";

const checkProfileToken = async (token: string) : Promise<JWTProfilePayload | null> => {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtLibPayload | string;
        if (typeof decoded === "string") {
            return null;
        }
        return decoded as JWTProfilePayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default checkProfileToken;