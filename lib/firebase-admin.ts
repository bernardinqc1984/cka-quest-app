import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
  }
  return initializeApp({ credential: cert(JSON.parse(serviceAccountKey)) });
}

export async function verifyIdToken(idToken: string) {
  return getAuth(getAdminApp()).verifyIdToken(idToken);
}

const SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export async function createFirebaseSessionCookie(idToken: string): Promise<string> {
  return getAuth(getAdminApp()).createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
}

export async function verifyFirebaseSession(cookie: string): Promise<{ uid: string; name?: string; email?: string }> {
  const decoded = await getAuth(getAdminApp()).verifySessionCookie(cookie, true);
  return { uid: decoded.uid, name: decoded.name, email: decoded.email };
}

export async function revokeFirebaseSession(uid: string): Promise<void> {
  await getAuth(getAdminApp()).revokeRefreshTokens(uid);
}

export function getDb() {
  return getFirestore(getAdminApp());
}
