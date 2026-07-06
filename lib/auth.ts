import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_USERNAME = "zeki";
export const ADMIN_PASSWORD = "Zeki.2026";
export const SESSION_COOKIE = "sovereign-admin-session";
const SESSION_SECRET = "sovereign-admin-session-secret";
const SESSION_PAYLOAD = "admin:zeki";

export function createSessionToken(): string {
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(SESSION_PAYLOAD)
    .digest("hex");
  return `${SESSION_PAYLOAD}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (payload !== SESSION_PAYLOAD || !signature) return false;

  const expected = createHmac("sha256", SESSION_SECRET)
    .update(SESSION_PAYLOAD)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyCredentials(
  username: string,
  password: string,
): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
