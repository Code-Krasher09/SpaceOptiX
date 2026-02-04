import { NextResponse } from "next/server";

type RouteContext = {
  params: { id: string };
};

export async function GET(_: Request, { params }: RouteContext) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `Get booking ${params.id} not implemented`,
      },
    },
    { status: 501 },
  );
}

export async function PATCH(_: Request, { params }: RouteContext) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `Update booking ${params.id} not implemented`,
      },
    },
    { status: 501 },
  );
}
