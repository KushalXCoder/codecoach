import { Mistral } from '@mistralai/mistralai';
import { getPrompt } from "@/lib/prompt";
import { NextRequest, NextResponse } from "next/server";
import redisClient, { connectRedis } from "@/lib/provider/connectRedis";
import connectDB from '@/lib/provider/connectDb';
import { Questions } from '@/models/questions.model';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const { codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions } = await req.json();
        if(!codeforcesId || !rating || !dailyLimit || !improveTopics || !experiencedTopics || !leveledQuestions) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const prompt = await getPrompt(rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions);

        // Connect to Redis and check for cached response
        await connectRedis();

        const redisKey = `user-${codeforcesId}-${new Date().toISOString().slice(0,10)}`;
        const cached = await redisClient.get(redisKey);

        if(cached) {
            console.log("Using cached AI response");
            return NextResponse.json({ message: "Successfully fetched cached content", selectedProblems: JSON.parse(cached) }, { status: 200 });
        }

        // If not cached, call the AI model
        const chatResponse = await client.chat.complete({
            model: "devstral-small-latest",
            messages: [{
                role: "user",
                content: prompt,
            }],
        });

        // Process AI response
        const content = chatResponse.choices[0].message.content as string;
        const cleaned = content
        .trim()
        .replace(/^```json\s*/, '')
        .replace(/```$/, '');

        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            return NextResponse.json({ message: "Failed to parse AI response", selectedProblems: content }, { status: 500 });
        }

        // Cache in Redis for 24 hours
        await redisClient.set(redisKey, JSON.stringify(parsed.selected), { EX: 24 * 60 * 60 });

        // Store to database
        await connectDB();

        const user = await Questions.findOne({ codeforcesId });
        if(!user) {
            console.error("User not found for storing today's questions:", codeforcesId);
            return NextResponse.json({ message: "User not found for storing today's questions" }, { status: 404 });
        }

        user.todaysQuestions = parsed.selected;
        user.questions = [...user.questions, ...parsed.selected];
        await user.save();

        return NextResponse.json({ message: "Successfully generated content", selectedProblems: parsed }, { status: 200 });
    } catch (error) {
        console.error("Error generating AI content:", error);
        return NextResponse.json({ message: "AI generation failed" }, { status: 500 });
    }
}