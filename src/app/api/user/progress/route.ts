import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { sql } from "@/lib/db";
import { validateSession } from "@/lib/auth";
import { getSessionCookie } from "@/lib/session-cookie";
import { toApiError } from "@/lib/api-errors";

export const runtime = "nodejs";

type Answered = Record<string, { correct: boolean; at: number; xp: number }>;

export async function GET() {
  try {
    await ensureDB();
    const token = await getSessionCookie();
    if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const session = await validateSession(token);
    if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const result = await sql`
      SELECT p.xp, p.streak, p.answered, u.username
      FROM progress p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ${session.user_id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ xp: 0, streak: 0, answered: {}, username: session.username });
    }

    const row = result.rows[0] as { xp: number; streak: number; answered: Answered; username: string };
    return NextResponse.json({ xp: row.xp || 0, streak: row.streak || 0, answered: row.answered || {}, username: row.username });
  } catch (e) {
    const apiErr = toApiError(e);
    return NextResponse.json(apiErr.body, { status: apiErr.status });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDB();
    const token = await getSessionCookie();
    if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const session = await validateSession(token);
    if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { xp, streak, answered } = await request.json();

    const safeXp = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
    const safeStreak = Number.isFinite(streak) ? Math.max(0, Math.floor(streak)) : 0;
    const safeAnswered = answered && typeof answered === "object" ? answered : {};

    await sql`
      UPDATE progress
      SET xp = ${safeXp}, streak = ${safeStreak}, answered = ${JSON.stringify(safeAnswered)}::jsonb, updated_at = NOW()
      WHERE user_id = ${session.user_id}
    `;

    return NextResponse.json({ success: true });
  } catch (e) {
    const apiErr = toApiError(e);
    return NextResponse.json(apiErr.body, { status: apiErr.status });
  }
}

