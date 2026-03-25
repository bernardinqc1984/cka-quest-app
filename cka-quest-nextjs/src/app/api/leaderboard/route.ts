import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  await ensureDB();
  const result = await sql`
    SELECT u.username, p.xp, p.streak, p.updated_at
    FROM progress p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.xp DESC, p.updated_at DESC
    LIMIT 25
  `;
  return NextResponse.json({ rows: result.rows });
}

