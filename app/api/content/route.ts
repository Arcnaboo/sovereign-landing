import { NextResponse } from "next/server";
import { getSiteContent, isValidLocale, saveSiteContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content/types";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");
  const all = searchParams.get("all") === "true";

  if (all) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const content = await getSiteContent();
    return NextResponse.json(content);
  }

  const site = await getSiteContent();
  if (locale && isValidLocale(locale)) {
    return NextResponse.json(site[locale]);
  }

  return NextResponse.json(site);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteContent;
  if (!body.en || !body.tr) {
    return NextResponse.json(
      { error: "Content must include en and tr locales" },
      { status: 400 },
    );
  }

  await saveSiteContent(body);
  return NextResponse.json({ ok: true });
}
