import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { sql } from "@/lib/db";
import { validateSession } from "@/lib/auth";
import { getSessionCookie } from "@/lib/session-cookie";

export const runtime = "nodejs";

export async function POST() {
  await ensureDB();
  const token = await getSessionCookie();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const session = await validateSession(token);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await sql`
    UPDATE progress
    SET xp = 0, streak = 0, answered = ${"{}"}::jsonb, updated_at = NOW()
    WHERE user_id = ${session.user_id}
  `;

  return NextResponse.json({ success: true });
}

