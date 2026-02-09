import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { verifyAuthToken } from "@/lib/auth";
import { User } from "@/lib/models/User";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Not authenticated" },
      },
      { status: 401 },
    );
  }

  try {
    const payload = await verifyAuthToken(token);
    await connectDb();

    const user = await User.findById(payload.sub).lean();
    if (!user) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "User not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        affiliation: user.affiliation,
        department: user.department,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "UNAUTHORIZED", message: "Invalid token" } },
      { status: 401 },
    );
  }
}
