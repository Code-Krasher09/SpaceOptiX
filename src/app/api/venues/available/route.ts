import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Available venues not implemented",
      },
    },
    { status: 501 },
  );
}
