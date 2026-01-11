  import { cookies } from "next/headers";
  import jwt from "jsonwebtoken";
  import checkToken from "@/lib/helper/checkToken";
  import { NextRequest, NextResponse } from "next/server";

  export const POST = async (req: NextRequest) => {
    const profileData = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await checkToken(token);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newPayload = {
      data: {
        email: decoded.data.email,
        setupCompleted: true,
        ...profileData,
      }
    };

    const newToken = jwt.sign(
      newPayload,
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    cookieStore.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true });
  };