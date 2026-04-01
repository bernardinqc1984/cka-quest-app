import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getSessionCookie } from "@/lib/session-cookie";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST() {
  const cookie = await getSessionCookie();
  if (!cookie) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const session = await validateSession(cookie);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await getDb().collection("users").doc(session.uid).update({
    xp: 0,
    streak: 0,
    answered: {},
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
