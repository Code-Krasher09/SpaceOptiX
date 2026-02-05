import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";
import { UserRegistrationRequest } from "@/lib/models/UserRegistrationRequest";

export async function POST(request: Request) {
  let payload: {
    name?: string;
    email?: string;
    department?: string;
    password?: string;
  } = {};

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

  let { name, email, department, password } = payload;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof department !== "string" ||
    typeof password !== "string" ||
    !name ||
    !email ||
    !department ||
    !password
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "VALIDATION_ERROR", message: "Missing required fields" },
      },
      { status: 400 },
    );
  }

  name = name.trim();
  email = email.trim();
  department = department.trim();

  const allowedEmailRegex = /^[^\s@]+@([a-z0-9-]+\.)*iitkgp\.ac\.in$/i;
  email = email.trim().toLowerCase();

  if (!allowedEmailRegex.test(email)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "EMAIL_DOMAIN_NOT_ALLOWED",
          message: "Only iitkgp.ac.in email addresses are allowed",
        },
      },
      { status: 400 },
    );
  }

  await connectDb();

  const existing = await User.findOne({ email: email }).lean();
  if (existing) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "EMAIL_EXISTS", message: "Email already registered" },
      },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email,
    department,
    passwordHash,
    affiliation: "STUDENT",
    role: "GUEST",
  });

  const token = crypto.randomUUID();
  const validUntil = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await UserRegistrationRequest.create({
    userId: user._id,
    token,
    validUntil,
    affiliation: "STUDENT",
  });

  const responsePayload: Record<string, unknown> = {
    ok: true,
    message: "Verification link generated",
  };

  if (process.env.NODE_ENV === "development") {
    responsePayload.verificationToken = token;
  }

  return NextResponse.json(responsePayload, { status: 201 });
}
