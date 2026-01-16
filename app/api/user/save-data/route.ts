import connectDB from "@/lib/provider/connectDb";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    // try {
    //     const cookieStore = await cookies();
    //     const token = cookieStore.get('token')?.value;

    //     if(!token) {
    //         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //     }

    //     const decoded = await checkToken(token);
    //     if(!decoded) {
    //         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //     }

    //     await connectDB();

    //     const { profileData } = await req.json();
    //     if(!profileData) {
    //         return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    //     }

    //     const updateUser = await User.findOneAndUpdate(
    //         { email: decoded.data.email },
    //         { ...profileData },
    //         { new: true }
    //     );

    //     if(!updateUser) {
    //         return NextResponse.json({ message: "User not found" }, { status: 404 });
    //     }

    //     return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
    // } catch (error) {
    //     console.error("Error in save-data route:", error);
    //     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    // }
    // try {
    //     await connectDB();

    //     const { profileData } = await req.json();
    //     if(!profileData) {
    //         return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    //     }

    //     const user = await User.create({ ...profileData });
    //     if(!user) {
    //         return NextResponse.json({ message: "Could not save data" }, { status: 500 });
    //     }

    //     return NextResponse.json({ message: "Data saved successfully", user }, { status: 200 });
    // } catch (error) {
    //     console.error("Error in save-data route:", error);
    //     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    // }
}