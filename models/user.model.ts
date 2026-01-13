import mongoose, { set } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    setupCompleted: {
        type: Boolean,
        default: false,
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
    updatedSettings: {
        type: Object,
        default: null,
    }
});

const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;