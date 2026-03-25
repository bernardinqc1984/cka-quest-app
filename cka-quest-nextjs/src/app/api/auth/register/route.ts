import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { sql } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session-cookie";
import { toApiError } from "@/lib/api-errors";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await ensureDB();
    const { username, password } = await request.json();

    const u = (username || "").trim().toLowerCase();
    const p = (password || "").trim();

    if (!u || !p) return NextResponse.json({ error: "fields_required" }, { status: 400 });

    const existing = await sql`SELECT id FROM users WHERE username = ${u}`;
    if (existing.rows.length > 0) return NextResponse.json({ error: "user_exists" }, { status: 409 });

    const hash = await hashPassword(p);
    const result = await sql`
      INSERT INTO users (username, password_hash) VALUES (${u}, ${hash})
      RETURNING id
    `;
    const userId = result.rows[0]?.id as number;

    await sql`INSERT INTO progress (user_id, xp, streak, answered) VALUES (${userId}, 0, 0, ${"{}"}::jsonb)`;

    const token = await createSession(userId);
    await setSessionCookie(token);

    return NextResponse.json({ success: true, username: u });
  } catch (e) {
    const apiErr = toApiError(e);
    return NextResponse.json(apiErr.body, { status: apiErr.status });
  }
}

