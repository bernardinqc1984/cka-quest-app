import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { sql } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";
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

    const result = await sql`SELECT id, password_hash FROM users WHERE username = ${u}`;
    if (result.rows.length === 0) return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });

    const user = result.rows[0] as { id: number; password_hash: string };
    const valid = await verifyPassword(p, user.password_hash);
    if (!valid) return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });

    const token = await createSession(user.id);
    await setSessionCookie(token);

    return NextResponse.json({ success: true, username: u });
  } catch (e) {
    const apiErr = toApiError(e);
    return NextResponse.json(apiErr.body, { status: apiErr.status });
  }
}

