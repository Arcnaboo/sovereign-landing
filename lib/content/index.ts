import { readFile, writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import type { Locale, LocaleContent, SiteContent } from "./types";

export const LOCALES: Locale[] = ["en", "tr"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "sovereign-locale";

const CONTENT_PATH = path.join(process.cwd(), "content", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readFile(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function getLocaleContent(locale: Locale): Promise<LocaleContent> {
  const site = await getSiteContent();
  return site[locale] ?? site[DEFAULT_LOCALE];
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  if (value === "tr" || value === "en") return value;
  return DEFAULT_LOCALE;
}

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
