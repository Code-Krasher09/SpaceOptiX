import { NextResponse } from "next/server";

type RouteContext = {
  params: { bookingId: string };
};

export async function GET(_: Request, { params }: RouteContext) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `Audit log for ${params.bookingId} not implemented`,
      },
    },
    { status: 501 },
  );
}
