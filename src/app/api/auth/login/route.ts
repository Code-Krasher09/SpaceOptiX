import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: { code: "NOT_IMPLEMENTED", message: "Login not implemented" },
    },
    { status: 501 },
  );
}
