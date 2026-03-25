import crypto from "crypto";
import { sql } from "@/lib/db";

export type SessionUser = { user_id: number; username: string };

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verify, "hex"));
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await sql`INSERT INTO sessions (user_id, token, expires_at) VALUES (${userId}, ${token}, ${expiresAt.toISOString()}::timestamptz)`;
  return token;
}

export async function validateSession(token: string): Promise<SessionUser | null> {
  const result = await sql`
    SELECT s.user_id, u.username
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ${token} AND s.expires_at > NOW()
  `;
  return (result.rows[0] as SessionUser | undefined) || null;
}

export async function deleteSession(token: string) {
  await sql`DELETE FROM sessions WHERE token = ${token}`;
}

