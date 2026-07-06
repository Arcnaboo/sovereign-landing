"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Locale, LocaleContent, SiteContent } from "@/lib/content/types";

const SECTIONS = [
  { id: "metadata", label: "Metadata" },
  { id: "nav", label: "Navigation" },
  { id: "hero", label: "Hero" },
  { id: "intelligence", label: "Intelligence" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "command", label: "Command Center" },
  { id: "globalReach", label: "Global Reach" },
  { id: "architecture", label: "Architecture" },
  { id: "security", label: "Security" },
  { id: "evolution", label: "Evolution" },
  { id: "access", label: "Access CTA" },
  { id: "footer", label: "Footer" },
  { id: "voicePrompts", label: "Voice Prompts" },
] as const;

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-sm border border-platinum/15 bg-obsidian px-3 py-2 font-mono text-sm text-platinum outline-none focus:border-quantum/50";

  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-platinum/40">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

function setNested(
  obj: LocaleContent,
  path: string,
  value: string,
): LocaleContent {
  const keys = path.split(".");
  const result = structuredClone(obj);
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = current[key];
    if (Array.isArray(next)) {
      const idx = Number(keys[i + 1]);
      if (!Number.isNaN(idx)) {
        const item = next[idx] as Record<string, unknown>;
        current = item;
        i++;
        continue;
      }
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return result;
}

function patchLocale(
  content: SiteContent,
  locale: Locale,
  updater: (current: LocaleContent) => LocaleContent,
): SiteContent {
  return {
    en: locale === "en" ? updater(content.en) : content.en,
    tr: locale === "tr" ? updater(content.tr) : content.tr,
  };
}

export function ContentEditor() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [section, setSection] = useState<string>("hero");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/content?all=true");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = (await res.json()) as SiteContent;
    setContent(data);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setStatus("");

    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    setSaving(false);
    if (res.ok) {
      setStatus("Saved successfully");
    } else {
      setStatus("Failed to save");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function update(path: string, value: string) {
    setContent((prev) =>
      prev
        ? patchLocale(prev, locale, (current) => setNested(current, path, value))
        : prev,
    );
  }

  if (!content) {
    return (
      <p className="font-mono text-sm text-platinum/50">Loading content...</p>
    );
  }

  const siteContent = content;
  const c = siteContent[locale];

  function renderSection() {
    switch (section) {
      case "metadata":
        return (
          <div className="grid gap-4">
            <Field label="Page Title" value={c.metadata.title} onChange={(v) => update("metadata.title", v)} />
            <Field label="Description" value={c.metadata.description} onChange={(v) => update("metadata.description", v)} multiline />
            <Field label="OG Title" value={c.metadata.ogTitle} onChange={(v) => update("metadata.ogTitle", v)} />
            <Field label="OG Description" value={c.metadata.ogDescription} onChange={(v) => update("metadata.ogDescription", v)} />
          </div>
        );
      case "nav":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(c.nav).map(([key, val]) => (
              <Field key={key} label={key} value={val} onChange={(v) => update(`nav.${key}`, v)} />
            ))}
          </div>
        );
      case "hero":
        return (
          <div className="grid gap-4">
            <Field label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => update("hero.eyebrow", v)} />
            <Field label="Title (gold)" value={c.hero.titleGold} onChange={(v) => update("hero.titleGold", v)} />
            <Field label="Title (platinum)" value={c.hero.titlePlatinum} onChange={(v) => update("hero.titlePlatinum", v)} />
            <Field label="Subtitle line 1" value={c.hero.subtitleLine1} onChange={(v) => update("hero.subtitleLine1", v)} />
            <Field label="Subtitle line 2" value={c.hero.subtitleLine2} onChange={(v) => update("hero.subtitleLine2", v)} />
            <Field label="Speak CTA" value={c.hero.speakCta} onChange={(v) => update("hero.speakCta", v)} />
            <Field label="Request CTA" value={c.hero.requestCta} onChange={(v) => update("hero.requestCta", v)} />
          </div>
        );
      case "intelligence":
        return (
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Field label="Eyebrow" value={c.intelligence.eyebrow} onChange={(v) => update("intelligence.eyebrow", v)} />
              <Field label="Title" value={c.intelligence.title} onChange={(v) => update("intelligence.title", v)} />
              <Field label="Title highlight" value={c.intelligence.titleHighlight} onChange={(v) => update("intelligence.titleHighlight", v)} />
              <Field label="Description" value={c.intelligence.description} onChange={(v) => update("intelligence.description", v)} multiline />
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-gold/80">Metrics</p>
              <div className="grid gap-4">
                {c.intelligence.metrics.map((m, i) => (
                  <div key={i} className="panel-border grid gap-3 rounded-sm p-4 sm:grid-cols-3">
                    <Field label="Value" value={String(m.value)} onChange={(v) => {
                      const metrics = [...c.intelligence.metrics];
                      metrics[i] = { ...metrics[i], value: Number(v) || 0 };
                      setContent(patchLocale(siteContent, locale, (current) => ({
                        ...current,
                        intelligence: { ...current.intelligence, metrics },
                      })));
                    }} />
                    <Field label="Suffix" value={m.suffix} onChange={(v) => {
                      const metrics = [...c.intelligence.metrics];
                      metrics[i] = { ...metrics[i], suffix: v };
                      setContent(patchLocale(siteContent, locale, (current) => ({
                        ...current,
                        intelligence: { ...current.intelligence, metrics },
                      })));
                    }} />
                    <Field label="Label" value={m.label} onChange={(v) => {
                      const metrics = [...c.intelligence.metrics];
                      metrics[i] = { ...metrics[i], label: v };
                      setContent(patchLocale(siteContent, locale, (current) => ({
                        ...current,
                        intelligence: { ...current.intelligence, metrics },
                      })));
                    }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-gold/80">Bullets</p>
              <div className="grid gap-3">
                {c.intelligence.bullets.map((b, i) => (
                  <Field key={i} label={`Bullet ${i + 1}`} value={b} onChange={(v) => {
                    const bullets = [...c.intelligence.bullets];
                    bullets[i] = v;
                    setContent(patchLocale(siteContent, locale, (current) => ({
                      ...current,
                      intelligence: { ...current.intelligence, bullets },
                    })));
                  }} />
                ))}
              </div>
            </div>
          </div>
        );
      case "ecosystem":
        return (
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Field label="Eyebrow" value={c.ecosystem.eyebrow} onChange={(v) => update("ecosystem.eyebrow", v)} />
              <Field label="Title" value={c.ecosystem.title} onChange={(v) => update("ecosystem.title", v)} />
              <Field label="Description" value={c.ecosystem.description} onChange={(v) => update("ecosystem.description", v)} multiline />
            </div>
            {c.ecosystem.modules.map((mod, i) => (
              <div key={i} className="panel-border grid gap-3 rounded-sm p-4">
                <p className="font-mono text-[10px] uppercase text-platinum/40">Module {i + 1}</p>
                <Field label="Title" value={mod.title} onChange={(v) => {
                  const modules = [...c.ecosystem.modules];
                  modules[i] = { ...modules[i], title: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    ecosystem: { ...current.ecosystem, modules },
                  })));
                }} />
                <Field label="Description" value={mod.desc} onChange={(v) => {
                  const modules = [...c.ecosystem.modules];
                  modules[i] = { ...modules[i], desc: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    ecosystem: { ...current.ecosystem, modules },
                  })));
                }} multiline />
              </div>
            ))}
          </div>
        );
      case "command":
        return (
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Field label="Eyebrow" value={c.command.eyebrow} onChange={(v) => update("command.eyebrow", v)} />
              <Field label="Title" value={c.command.title} onChange={(v) => update("command.title", v)} />
              <Field label="Title highlight" value={c.command.titleHighlight} onChange={(v) => update("command.titleHighlight", v)} />
              <Field label="Description" value={c.command.description} onChange={(v) => update("command.description", v)} multiline />
              <Field label="Live tag" value={c.command.liveTag} onChange={(v) => update("command.liveTag", v)} />
            </div>
            {c.command.events.map((ev, i) => (
              <div key={i} className="panel-border grid gap-3 rounded-sm p-4 sm:grid-cols-3">
                <Field label="Time" value={ev.time} onChange={(v) => {
                  const events = [...c.command.events];
                  events[i] = { ...events[i], time: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    command: { ...current.command, events },
                  })));
                }} />
                <Field label="Type" value={ev.type} onChange={(v) => {
                  const events = [...c.command.events];
                  events[i] = { ...events[i], type: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    command: { ...current.command, events },
                  })));
                }} />
                <Field label="Message" value={ev.msg} onChange={(v) => {
                  const events = [...c.command.events];
                  events[i] = { ...events[i], msg: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    command: { ...current.command, events },
                  })));
                }} />
              </div>
            ))}
          </div>
        );
      case "globalReach":
        return (
          <div className="grid gap-4">
            <Field label="Eyebrow" value={c.globalReach.eyebrow} onChange={(v) => update("globalReach.eyebrow", v)} />
            <Field label="Title" value={c.globalReach.title} onChange={(v) => update("globalReach.title", v)} />
            <Field label="Description" value={c.globalReach.description} onChange={(v) => update("globalReach.description", v)} multiline />
            <Field label="Map caption" value={c.globalReach.mapCaption} onChange={(v) => update("globalReach.mapCaption", v)} />
          </div>
        );
      case "architecture":
        return (
          <div className="grid gap-4">
            <Field label="Eyebrow" value={c.architecture.eyebrow} onChange={(v) => update("architecture.eyebrow", v)} />
            <Field label="Title" value={c.architecture.title} onChange={(v) => update("architecture.title", v)} />
            {c.architecture.layers.map((layer, i) => (
              <div key={i} className="panel-border grid gap-3 rounded-sm p-4">
                <Field label="Label" value={layer.label} onChange={(v) => {
                  const layers = [...c.architecture.layers];
                  layers[i] = { ...layers[i], label: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    architecture: { ...current.architecture, layers },
                  })));
                }} />
                <Field label="Subtitle" value={layer.sub} onChange={(v) => {
                  const layers = [...c.architecture.layers];
                  layers[i] = { ...layers[i], sub: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    architecture: { ...current.architecture, layers },
                  })));
                }} />
              </div>
            ))}
          </div>
        );
      case "security":
        return (
          <div className="grid gap-4">
            <Field label="Eyebrow" value={c.security.eyebrow} onChange={(v) => update("security.eyebrow", v)} />
            <Field label="Title" value={c.security.title} onChange={(v) => update("security.title", v)} />
            {c.security.items.map((item, i) => (
              <Field key={i} label={`Item ${i + 1}`} value={item} onChange={(v) => {
                const items = [...c.security.items];
                items[i] = v;
                setContent(patchLocale(siteContent, locale, (current) => ({
                  ...current,
                  security: { ...current.security, items },
                })));
              }} />
            ))}
          </div>
        );
      case "evolution":
        return (
          <div className="grid gap-4">
            <Field label="Eyebrow" value={c.evolution.eyebrow} onChange={(v) => update("evolution.eyebrow", v)} />
            <Field label="Title" value={c.evolution.title} onChange={(v) => update("evolution.title", v)} />
            <Field label="Footer" value={c.evolution.footer} onChange={(v) => update("evolution.footer", v)} multiline />
            {c.evolution.steps.map((step, i) => (
              <div key={i} className="panel-border grid gap-3 rounded-sm p-4 sm:grid-cols-2">
                <Field label="Era" value={step.era} onChange={(v) => {
                  const steps = [...c.evolution.steps];
                  steps[i] = { ...steps[i], era: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    evolution: { ...current.evolution, steps },
                  })));
                }} />
                <Field label="Year" value={step.year} onChange={(v) => {
                  const steps = [...c.evolution.steps];
                  steps[i] = { ...steps[i], year: v };
                  setContent(patchLocale(siteContent, locale, (current) => ({
                    ...current,
                    evolution: { ...current.evolution, steps },
                  })));
                }} />
              </div>
            ))}
          </div>
        );
      case "access":
        return (
          <div className="grid gap-4">
            <Field label="Title" value={c.access.title} onChange={(v) => update("access.title", v)} />
            <Field label="Description" value={c.access.description} onChange={(v) => update("access.description", v)} multiline />
            <Field label="Email placeholder" value={c.access.emailPlaceholder} onChange={(v) => update("access.emailPlaceholder", v)} />
            <Field label="Submit button" value={c.access.submit} onChange={(v) => update("access.submit", v)} />
          </div>
        );
      case "footer":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(c.footer).map(([key, val]) => (
              <Field key={key} label={key} value={val} onChange={(v) => update(`footer.${key}`, v)} />
            ))}
          </div>
        );
      case "voicePrompts":
        return (
          <div className="grid gap-3">
            {c.voicePrompts.map((prompt, i) => (
              <Field key={i} label={`Prompt ${i + 1}`} value={prompt} onChange={(v) => {
                const voicePrompts = [...c.voicePrompts];
                voicePrompts[i] = v;
                setContent(patchLocale(siteContent, locale, (current) => ({
                  ...current,
                  voicePrompts,
                })));
              }} />
            ))}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-obsidian text-platinum lg:flex-row">
      <aside className="border-b border-gold/10 p-6 lg:w-64 lg:border-b-0 lg:border-r">
        <h1 className="font-display text-xl font-bold gold-gradient-text">Admin</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-platinum/40">
          Content Manager
        </p>

        <div className="mt-6 flex gap-2">
          {(["en", "tr"] as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition ${
                locale === l
                  ? "bg-gold/20 text-gold ring-1 ring-gold/40"
                  : "text-platinum/50 hover:text-platinum"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <nav className="mt-6 flex flex-wrap gap-1 lg:flex-col">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`rounded-sm px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider transition ${
                section === s.id
                  ? "bg-quantum/10 text-quantum"
                  : "text-platinum/50 hover:text-platinum"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gold/10 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold">
              {SECTIONS.find((s) => s.id === section)?.label}
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-wider text-platinum/40">
              Editing {locale.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className="font-mono text-xs text-quantum">{status}</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider text-platinum/50 hover:text-gold"
            >
              View site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="font-mono text-[11px] uppercase tracking-wider text-platinum/50 hover:text-platinum"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-sm bg-gold px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-obsidian hover:bg-[#e8c547] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{renderSection()}</div>
      </main>
    </div>
  );
}
