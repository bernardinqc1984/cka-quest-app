export function toApiError(e: unknown) {
  const any = e as { code?: string; message?: string; name?: string } | null;
  const code = any?.code || "";
  if (code === "missing_connection_string") {
    return { status: 500, body: { error: "db_not_configured" as const } };
  }
  return { status: 500, body: { error: "server_error" as const, code: code || any?.name || "unknown" } };
}

