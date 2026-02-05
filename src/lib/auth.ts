import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export type AuthTokenPayload = {
  sub: string;
  role: "ROOT" | "SYSTEM_ADMIN" | "USER" | "GUEST";
  affiliation: "STUDENT" | "FACULTY" | "STAFF";
};

export async function signAuthToken(payload: AuthTokenPayload) {
  return new SignJWT({ role: payload.role, affiliation: payload.affiliation })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}
