import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    codeforcesId: {
        type: String,
        required: true,
    },
    todaysQuestions: {
        type: [Object],
        default: [],
    },
    questions: {
        type: [Object],
    }
});

export const Questions = mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);