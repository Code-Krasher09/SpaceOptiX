import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";
import { signAuthToken } from "@/lib/auth";

export async function POST(request: Request) {
  let payload: { email?: string; password?: string } = {};

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INVALID_JSON", message: "Invalid JSON body" },
      },
      { status: 400 },
    );
  }

  const { email, password } = payload;
  if (!email || !password) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "VALIDATION_ERROR", message: "Missing credentials" },
      },
      { status: 400 },
    );
  }

  await connectDb();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" },
      },
      { status: 401 },
    );
  }

  if (user.role === "GUEST") {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "NOT_VERIFIED", message: "Email not verified" },
      },
      { status: 403 },
    );
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" },
      },
      { status: 401 },
    );
  }

  const token = await signAuthToken({
    sub: user._id.toString(),
    role: user.role,
    affiliation: user.affiliation,
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
