import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        if(connection) {
            console.log("MongoDB connected");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;