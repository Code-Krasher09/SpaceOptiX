import { NextResponse } from "next/server";

type RouteContext = {
  params: { id: string };
};

export async function PATCH(_: Request, { params }: RouteContext) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `Submit booking ${params.id} not implemented`,
      },
    },
    { status: 501 },
  );
}
