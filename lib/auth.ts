import { verifyFirebaseSession, getDb } from "@/lib/firebase-admin";

export type SessionUser = { uid: string; username: string };

export async function validateSession(cookie: string): Promise<SessionUser | null> {
  try {
    const { uid } = await verifyFirebaseSession(cookie);
    const doc = await getDb().collection("users").doc(uid).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return { uid, username: data.username as string };
  } catch {
    return null;
  }
}
