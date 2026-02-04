import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "List bookings not implemented",
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
        message: "Create booking not implemented",
      },
    },
    { status: 501 },
  );
}
