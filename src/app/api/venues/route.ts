import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "List venues not implemented",
      },
    },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Create venue not implemented",
      },
    },
    { status: 501 },
  );
}
