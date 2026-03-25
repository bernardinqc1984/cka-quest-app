import { initDB } from "@/lib/db";

declare global {
  var __ckaDbInitialized: boolean | undefined;
}

export async function ensureDB() {
  if (globalThis.__ckaDbInitialized) return;
  await initDB();
  globalThis.__ckaDbInitialized = true;
}

