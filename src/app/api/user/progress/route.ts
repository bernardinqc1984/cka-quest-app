import { NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getSessionCookie } from "@/lib/session-cookie";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

type Answered = Record<string, { correct: boolean; at: number; xp: number }>;

export async function GET() {
  const cookie = await getSessionCookie();
  if (!cookie) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const session = await validateSession(cookie);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const doc = await getDb().collection("users").doc(session.uid).get();
  if (!doc.exists) {
    return NextResponse.json({ xp: 0, streak: 0, answered: {}, username: session.username });
  }

  const data = doc.data()!;
  return NextResponse.json({
    xp: (data.xp as number) || 0,
    streak: (data.streak as number) || 0,
    answered: (data.answered as Answered) || {},
    username: data.username as string,
  });
}

export async function POST(request: Request) {
  const cookie = await getSessionCookie();
  if (!cookie) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const session = await validateSession(cookie);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { xp, streak, answered } = await request.json();
  const safeXp = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  const safeStreak = Number.isFinite(streak) ? Math.max(0, Math.floor(streak)) : 0;
  const safeAnswered = answered && typeof answered === "object" ? answered : {};

  await getDb().collection("users").doc(session.uid).update({
    xp: safeXp,
    streak: safeStreak,
    answered: safeAnswered,
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
