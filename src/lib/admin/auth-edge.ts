const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
export const COOKIE_NAME = "celpe_admin_token";

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getAdminSecret(): Promise<string> {
  if (process.env.ADMIN_SECRET_KEY) return process.env.ADMIN_SECRET_KEY;
  const password = process.env.ADMIN_PASSWORD ?? "";
  return hmacHex("celpe-admin", password || "unset");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  try {
    const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/") + pad);
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;
    const [user, expStr, sig] = parts;
    const body = `${user}:${expStr}`;
    const secret = await getAdminSecret();
    const expectedSig = await hmacHex(secret, body);
    if (!timingSafeEqualHex(sig, expectedSig)) return false;
    if (user !== expectedUser) return false;
    if (Date.now() > Number(expStr)) return false;
    return true;
  } catch {
    return false;
  }
}

export { TOKEN_TTL_MS };
