import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    codeforcesId: {
        type: String,
        default: "",
    },
    dailyLimit: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    experiencedTopics: {
        type: [String],
        default: [],
    },
    improveTopics: {
        type: [String],
        default: [],
    },
});

const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;