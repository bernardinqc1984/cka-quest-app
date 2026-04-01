import { NextResponse } from "next/server";
import { verifyFirebaseSession, revokeFirebaseSession } from "@/lib/firebase-admin";
import { clearSessionCookie, getSessionCookie } from "@/lib/session-cookie";

export const runtime = "nodejs";

export async function POST() {
  const cookie = await getSessionCookie();
  if (cookie) {
    try {
      const { uid } = await verifyFirebaseSession(cookie);
      await revokeFirebaseSession(uid);
    } catch {
      // Session already invalid — still clear the cookie
    }
  }
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
