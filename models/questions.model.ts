import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    codeforcesId: {
        type: String,
    },
    username: {
        type: String,
    },
    todaysQuestions: {
        type: [Object],
        default: [],
    },
    questions: {
        type: [Object],
    },
    solvedQuestions: {
        type: [String],
        default: [],
    },
    streak: {
        type: Number,
        default: 0,
    },
});

export const Questions = mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);