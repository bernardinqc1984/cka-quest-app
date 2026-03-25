import { cookies } from "next/headers";

const COOKIE_NAME = "cka-session";
const MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function setSessionCookie(token: string) {
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function getSessionCookie(): Promise<string | null> {
  const c = await cookies();
  return c.get(COOKIE_NAME)?.value || null;
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

