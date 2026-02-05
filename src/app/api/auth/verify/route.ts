import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";
import { UserRegistrationRequest } from "@/lib/models/UserRegistrationRequest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "MISSING_TOKEN", message: "Token is required" },
      },
      { status: 400 },
    );
  }

  await connectDb();

  const registration = await UserRegistrationRequest.findOne({ token }).lean();
  if (!registration || registration.validUntil < new Date()) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "TOKEN_INVALID", message: "Token invalid or expired" },
      },
      { status: 400 },
    );
  }

  await User.updateOne(
    { _id: registration.userId },
    { $set: { role: "User" } },
  );
  await UserRegistrationRequest.deleteOne({ _id: registration._id });

  return NextResponse.json({ ok: true, message: "Email verified" });
}
