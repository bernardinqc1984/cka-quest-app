import { NextResponse } from "next/server";
import { verifyIdToken, createFirebaseSessionCookie, getDb } from "@/lib/firebase-admin";
import { setSessionCookie } from "@/lib/session-cookie";

export const runtime = "nodejs";

function usernameFromProfile(displayName?: string | null, email?: string | null): string {
  if (displayName) return displayName.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40).toLowerCase();
  if (email) return email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40).toLowerCase();
  return "user";
}

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    if (!idToken) return NextResponse.json({ error: "fields_required" }, { status: 400 });

    const decoded = await verifyIdToken(idToken);
    const db = getDb();
    const userRef = db.collection("users").doc(decoded.uid);
    const userDoc = await userRef.get();

    let username: string;
    if (userDoc.exists) {
      username = userDoc.data()!.username as string;
    } else {
      username = usernameFromProfile(decoded.name, decoded.email);
      await userRef.set({ username, xp: 0, streak: 0, answered: {}, updatedAt: new Date() });
    }

    const sessionCookie = await createFirebaseSessionCookie(idToken);
    await setSessionCookie(sessionCookie);

    return NextResponse.json({ success: true, username });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("OAuth login error:", msg);
    return NextResponse.json({ error: "server_error", detail: msg }, { status: 500 });
  }
}
