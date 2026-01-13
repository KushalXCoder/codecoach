import { Mistral } from '@mistralai/mistralai';
import { getPrompt } from "@/lib/helper/prompt";
import { NextRequest, NextResponse } from "next/server";
import redisClient, { connectRedis } from "@/lib/provider/connectRedis";
import connectDB from '@/lib/provider/connectDb';
import { Questions } from '@/models/questions.model';
import { FetchedQuestionsData, QuestionsData } from '@/lib/types/global.types';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        let { codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions } = await req.json();
        if(!codeforcesId || !rating || !dailyLimit || !improveTopics || !experiencedTopics || !leveledQuestions) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Connect to Redis and check for cached response
        await connectRedis();

        const redisKey = `user-${codeforcesId}`;
        const cached = await redisClient.get(redisKey);

        if(cached) {
            console.log("Using cached content");
            return NextResponse.json({ message: "Successfully fetched cached content", selectedProblems: JSON.parse(cached) }, { status: 200 });
        }

        // If not cached, call the AI model
        console.log("Generating new content via AI");
        
        // If, updatedSetting is there, use that rating
        await connectDB();

        // Parallel check both the models for the user
        const [user, userQuestions] = await Promise.all([
            User.findOne({ codeforcesId }),
            Questions.findOne({ codeforcesId }),
        ]);

        if(!user || !userQuestions) {
            console.error("User or Questions not found", codeforcesId);
            return NextResponse.json({ message: "User or Questions not found for storing today's questions" }, { status: 404 });
        }

        console.log(userQuestions);

        // Flag to check if settings were updated
        let flag = false;

        if(user.updatedSettings && (user.updatedSettings.rating !== rating || user.updatedSettings.dailyLimit !== dailyLimit)) {
            // Change the flag, to notify that settings were updated
            flag = true;

            // Changes the current values
            rating = user.updatedSettings.rating;
            dailyLimit = user.updatedSettings.dailyLimit;

            // Store later, when storing today's questions
        }

        console.log(rating, dailyLimit);

        // Get the prompt
        const prompt = await getPrompt(rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions);

        // Call the AI model
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
            parsed.selected = parsed.selected.map((question: FetchedQuestionsData) => ({
                ...question,
                solved: false,
            }));
        } catch (error) {
            console.error("Error parsing AI response:", error);
            return NextResponse.json({ message: "Failed to parse AI response", selectedProblems: content }, { status: 500 });
        }

        // Cache in Redis for 24 hours
        await redisClient.set(redisKey, JSON.stringify(parsed.selected), { EX: 24 * 60 * 60 });

        // Update the database

        // Update user's streak
        let cnt = 0;
        let streak = userQuestions.streak || 0;

        userQuestions.todaysQuestions.forEach((q: QuestionsData) => {
            if(q.solved) cnt++;
        });

        if(cnt == dailyLimit) {
            streak++;
        }

        // Update today's questions and overall questions
        await Questions.updateOne(
            { codeforcesId },
            { 
                $set: { todaysQuestions: parsed.selected, streak: streak },
                $push: { questions: { $each: parsed.selected }},
            }
        );

        // Update the rating and daily limit if settings were updated
        if(flag) {
            user.rating = rating;
            user.dailyLimit = dailyLimit;
            user.updatedSettings = null;

            // Update the token
            const payload = {
                data: {
                    email: user.email,
                    setupCompleted: true,
                    profileData: {
                        codeforcesId: user.codeforcesId,
                        rating: rating,
                        dailyLimit: dailyLimit,
                        experiencedTopics: user.experiencedTopics,
                        improveTopics: user.improveTopics,
                    }
                }
            }

            const newToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });

            const cookieStore = await cookies();
            cookieStore.set('token', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
        }

        await user.save();

        return NextResponse.json({ message: "Successfully generated content", selectedProblems: parsed.selected }, { status: 200 });
    } catch (error) {
        console.error("Error generating AI content:", error);
        return NextResponse.json({ message: "AI generation failed" }, { status: 500 });
    }
}