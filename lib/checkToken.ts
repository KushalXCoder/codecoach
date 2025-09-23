import jwt from "jsonwebtoken";

const checkToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        return decoded;   
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default checkToken;