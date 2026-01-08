import redisClient, { connectRedis } from "@/lib/provider/connectRedis";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { codeforcesId, updatedTodaysQuestions } = await req.json();

        console.log("Syncing questions for:", codeforcesId);
        console.log("Questions to sync:", updatedTodaysQuestions);

        if(!codeforcesId || !updatedTodaysQuestions) {
            return NextResponse.json({ message: "CodeforcesId or updatedTodaysQuestions is missing" }, { status: 400 });
        }

        await connectRedis();

        const key = `user-${codeforcesId}`;

        const ttl = await redisClient.ttl(key); // seconds

        console.log(updatedTodaysQuestions);
        await redisClient.set(key, JSON.stringify(updatedTodaysQuestions));

        if (ttl > 0) {
            await redisClient.expire(key, ttl);
        }

        return NextResponse.json({ message: "Questions synced successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error syncing questions:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}