import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
  const snap = await getDb().collection("users").orderBy("xp", "desc").limit(25).get();
  const rows = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      username: data.username as string,
      xp: (data.xp as number) || 0,
      streak: (data.streak as number) || 0,
      updated_at: (data.updatedAt as { toDate?: () => Date } | null)?.toDate?.()?.toISOString() ?? null,
    };
  });
  return NextResponse.json({ rows });
}
