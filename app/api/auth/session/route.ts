import { NextResponse } from "next/server";
import {
  isAdminAuthenticated,
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth";

export async function GET() {
  const authed = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function HEAD(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`${SESSION_COOKIE}=([^;]+)`),
  );
  const token = match?.[1];
  if (!verifySessionToken(token)) {
    return new NextResponse(null, { status: 401 });
  }
  return new NextResponse(null, { status: 200 });
}
