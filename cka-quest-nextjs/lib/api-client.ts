async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    const text = await res.text().catch(() => "");
    return { error: "bad_json_response", status: res.status, body: text?.slice(0, 500) || "" };
  }
}

export async function apiLogin(username: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return safeJson(res);
}

export async function apiRegister(username: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return safeJson(res);
}

export async function apiLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function getProgress() {
  const res = await fetch("/api/user/progress");
  if (!res.ok) return null;
  return safeJson(res);
}

export async function saveProgress(xp: number, streak: number, answered: Record<string, unknown>) {
  await fetch("/api/user/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xp, streak, answered }),
  });
}

export async function resetProgress() {
  await fetch("/api/user/reset", { method: "POST" });
}

