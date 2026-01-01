import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    contestId: {
        type: Number,
    },
    index: {
        type: String,
    },
    name: {
        type: String,
    },
    rating: {
        type: Number,
    },
    points: {
        type: Number,
    },
    tags: {
        type: [String],
        default: [],
    },
});

export const Problems = mongoose.models.Problems || mongoose.model("Problems", ProblemSchema);