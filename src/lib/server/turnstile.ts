interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

function isSiteverifyResponse(value: unknown): value is SiteverifyResponse {
  return typeof value === "object" && value !== null && typeof (value as { success?: unknown }).success === "boolean";
}

/** Asks Cloudflare whether the Turnstile token from the form is valid. */
export async function verifyTurnstile(token: string, secret: string, ip?: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const json: unknown = await res.json();
    return isSiteverifyResponse(json) && json.success;
  } catch {
    return false;
  }
}
