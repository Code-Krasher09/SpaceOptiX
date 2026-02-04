import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: { code: "NOT_IMPLEMENTED", message: "Register not implemented" },
    },
    { status: 501 },
  );
}
