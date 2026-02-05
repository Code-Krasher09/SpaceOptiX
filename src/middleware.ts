import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedPrefixes = [
  "/student",
  "/professor",
  "/incharge",
  "/admin",
  "/dashboard",
  "/profile",
  "/settings",
];

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const secretKey = new TextEncoder().encode(secret);
  await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/professor/:path*",
    "/incharge/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile",
    "/settings",
  ],
};
