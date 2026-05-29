import { createHmac, timingSafeEqual } from "crypto";
import { COOKIE_NAME, TOKEN_TTL_MS, verifyAdminToken as verifyAdminTokenEdge } from "./auth-edge";

export { COOKIE_NAME };

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret =
    process.env.ADMIN_SECRET_KEY ??
    createHmac("sha256", "celpe-admin").update(password || "unset").digest("hex");
  return { username, password, secret };
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminToken(username: string): string {
  const { secret } = getAdminCredentials();
  const exp = Date.now() + TOKEN_TTL_MS;
  const body = `${username}:${exp}`;
  const sig = signPayload(body, secret);
  return Buffer.from(`${body}:${sig}`).toString("base64url");
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  return verifyAdminTokenEdge(token);
}

export function verifyAdminPassword(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  if (!creds.password) return false;
  if (username !== creds.username) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(creds.password);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] ?? null;
}

export async function requireAdmin(request: Request): Promise<Response | null> {
  const token = getTokenFromRequest(request);
  if (!(await verifyAdminToken(token))) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  return null;
}

export function adminSessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TOKEN_TTL_MS / 1000}${secure}`;
}

export function clearAdminSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;
}
