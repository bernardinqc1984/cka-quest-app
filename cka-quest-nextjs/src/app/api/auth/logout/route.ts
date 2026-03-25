import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/ensure-db";
import { deleteSession } from "@/lib/auth";
import { clearSessionCookie, getSessionCookie } from "@/lib/session-cookie";

export const runtime = "nodejs";

export async function POST() {
  await ensureDB();
  const token = await getSessionCookie();
  if (token) await deleteSession(token);
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}

