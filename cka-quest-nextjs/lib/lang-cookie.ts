import type { LangKey } from "@/lib/i18n";

const NAME = "cka-lang";

export function getLangCookie(): LangKey | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.split(";").map((x) => x.trim()).find((x) => x.startsWith(`${NAME}=`));
  if (!m) return null;
  const val = decodeURIComponent(m.slice(NAME.length + 1));
  return (val as LangKey) || null;
}

export function setLangCookie(lang: LangKey) {
  if (typeof document === "undefined") return;
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${NAME}=${encodeURIComponent(lang)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

