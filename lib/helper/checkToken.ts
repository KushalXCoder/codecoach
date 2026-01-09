import jwt, { JwtPayload as JwtLibPayload } from "jsonwebtoken";
import { JWTPayload } from "../types/global.types";

const checkToken = async (token: string) : Promise<JWTPayload | null> => {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtLibPayload | string;
        if (typeof decoded === "string") {
            return null;
        }
        return decoded as JWTPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default checkToken;