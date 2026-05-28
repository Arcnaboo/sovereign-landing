import Image from "next/image";
import Link from "next/link";
import { CommandFeed } from "./components/CommandFeed";
import { GlobeCanvas } from "./components/GlobeCanvas";
import { MetricCounter } from "./components/MetricCounter";
import { VoicePrompt } from "./components/VoicePrompt";

const MODULES = [
  {
    title: "B2B Matchmaking",
    desc: "AI-powered supplier and buyer discovery across borders.",
    icon: "◈",
  },
  {
    title: "Global Networking",
    desc: "Cross-border executive relationships and strategic alliances.",
    icon: "◎",
  },
  {
    title: "Startup & Investor Hub",
    desc: "Founders, VCs, and family offices in one intelligence layer.",
    icon: "△",
  },
  {
    title: "Commerce Marketplace",
    desc: "International product and service exchange at scale.",
    icon: "⬡",
  },
  {
    title: "Supply Chain Intelligence",
    desc: "Logistics orchestration and route optimization.",
    icon: "⟁",
  },
  {
    title: "Enterprise Integrations",
    desc: "APIs and autonomous workflows for existing systems.",
    icon: "⊞",
  },
  {
    title: "Sovereign Finance",
    desc: "Investment and capital ecosystems with sovereign trust.",
    icon: "◇",
  },
  {
    title: "AI Governance",
    desc: "Commercial decision support with enterprise controls.",
    icon: "⬢",
  },
];

const SECURITY = [
  "Data Sovereignty",
  "Privacy Controls",
  "Enterprise Encryption",
  "Regional Compliance",
  "Sovereign AI Governance",
];

const EVOLUTION = [
  { era: "Traditional Commerce", year: "Past" },
  { era: "Digital Commerce", year: "2000s" },
  { era: "AI Commerce", year: "2020s" },
  { era: "Autonomous Commerce", year: "Next", active: true },
];

const CORRIDORS = [
  { from: "EU", to: "APAC", x: 72, y: 38 },
  { from: "NA", to: "LATAM", x: 28, y: 58 },
  { from: "MENA", to: "AFRICA", x: 52, y: 52 },
  { from: "APAC", to: "OC", x: 82, y: 68 },
];

export default function Home() {
  return (
    <div className="grain relative bg-obsidian text-platinum">
      {/* Navigation */}
      <header className="fixed top-0 z-40 w-full border-b border-gold/10 bg-obsidian/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/sovereign_logo.png"
              alt="SOVEREIGN"
              width={140}
              height={40}
              className="h-9 w-auto object-contain object-left"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-platinum/50 md:flex">
            <a href="#intelligence" className="transition hover:text-gold">
              Intelligence
            </a>
            <a href="#ecosystem" className="transition hover:text-gold">
              Ecosystem
            </a>
            <a href="#command" className="transition hover:text-gold">
              Command
            </a>
            <a href="#architecture" className="transition hover:text-gold">
              Architecture
            </a>
          </div>
          <a
            href="#access"
            className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-gold transition hover:bg-gold/20"
          >
            Request Access
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-sovereign opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(6,182,212,0.06),transparent_50%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-6 py-16 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-24">
          <div className="relative z-10 animate-fade-up">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-quantum">
              Zero Interface · Sovereign Intelligence
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="gold-gradient-text">The Next 50 Years</span>
              <br />
              <span className="text-platinum">of Global Commerce</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-platinum/60">
              One Sovereign Ecosystem.
              <br />
              <span className="text-platinum/90">Infinite Opportunities.</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#access"
                className="animate-voice-pulse group flex items-center gap-3 rounded-sm bg-quantum/15 px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-quantum ring-1 ring-quantum/40 transition hover:bg-quantum/25"
              >
                <span className="flex h-2 w-2 rounded-full bg-quantum shadow-[0_0_12px_#06b6d4]" />
                Speak To Sovereign AI
              </a>
              <a
                href="#access"
                className="rounded-sm border border-gold/30 px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-gold transition hover:border-gold/60 hover:bg-gold/5"
              >
                Request Access
              </a>
            </div>

            <div className="mt-12 max-w-xl rounded-sm border border-quantum/20 bg-nebula/60 p-4 backdrop-blur-sm">
              <VoicePrompt />
            </div>
          </div>

          <div className="relative aspect-square w-full max-lg:max-h-[420px] lg:aspect-auto lg:h-[min(72vh,640px)]">
            <GlobeCanvas />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--sovereign-obsidian)_85%)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-6 pb-8">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-platinum/20 p-2">
            <div className="h-2 w-0.5 animate-bounce rounded-full bg-gold/60" />
          </div>
        </div>
      </section>

      {/* Intelligence metrics */}
      <section
        id="intelligence"
        className="relative border-y border-gold/10 bg-nebula/40 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-quantum">
              Global Commerce Intelligence
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-platinum md:text-4xl">
              The AI layer orchestrating{" "}
              <span className="gold-gradient-text">world trade</span>
            </h2>
            <p className="mt-4 text-platinum/55 leading-relaxed">
              Autonomous matching, commercial intelligence, investment discovery,
              and global business opportunities — unified under sovereign
              intelligence.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCounter value={186} suffix="+" label="Countries Connected" />
            <MetricCounter value={2400000} suffix="" label="Businesses Connected" />
            <MetricCounter value={890000000} suffix="" label="Transactions Processed" />
            <MetricCounter value={12400} suffix="" label="Active AI Operations" />
          </div>

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Autonomous matching",
              "Commercial intelligence",
              "Investment discovery",
              "Global opportunities",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-platinum/45"
              >
                <span className="h-px w-6 bg-gold/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ecosystem modules */}
      <section id="ecosystem" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80">
                Core Ecosystem
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                Commerce modules. One network.
              </h2>
            </div>
            <p className="max-w-md text-sm text-platinum/50">
              Not a marketplace. Not a directory. The operating system that
              unifies every critical layer of international trade.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((mod) => (
              <article
                key={mod.title}
                className="group panel-border relative overflow-hidden rounded-sm p-6 transition duration-300 hover:border-gold/35 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
              >
                <div className="absolute -right-4 -top-4 font-display text-6xl text-gold/5 transition group-hover:text-gold/10">
                  {mod.icon}
                </div>
                <span className="font-mono text-2xl text-gold/70">{mod.icon}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-platinum">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-platinum/50">
                  {mod.desc}
                </p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-gold to-quantum transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI Command Center */}
      <section
        id="command"
        className="relative overflow-hidden border-y border-gold/10 bg-nebula py-24 lg:py-32"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(226,232,240,0.5)_2px,rgba(226,232,240,0.5)_4px)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-quantum cyan-glow">
                AI Command Center
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Intelligence at the{" "}
                <span className="gold-gradient-text">center</span>
              </h2>
              <p className="mt-4 text-platinum/55 leading-relaxed">
                Live global trade activity, investment opportunities, supply
                chain monitoring, and market signals — orchestrated by sovereign
                AI as the central nervous system of commerce.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  "Trade activity",
                  "Investment ops",
                  "Supply chain",
                  "Market signals",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-sm border border-platinum/10 bg-obsidian/60 px-4 py-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-quantum">
                      Live
                    </span>
                    <p className="mt-1 text-sm text-platinum/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-border rounded-sm p-1">
              <div className="flex items-center gap-2 border-b border-gold/10 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-red-500/80" />
                <span className="h-2 w-2 rounded-full bg-gold/80" />
                <span className="h-2 w-2 rounded-full bg-quantum/80" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-platinum/40">
                  sovereign://command/live
                </span>
              </div>
              <div className="p-4">
                <CommandFeed />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80">
                Global Reach
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                186+ countries. One sovereign network.
              </h2>
              <p className="mt-4 text-platinum/55">
                International business corridors, supply chain routes, and
                trade partnerships visualized across the planet.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {[
                  ["186+", "Countries"],
                  ["12K+", "Corridors"],
                  ["∞", "Opportunities"],
                ].map(([val, lab]) => (
                  <div key={lab}>
                    <dt className="font-display text-2xl font-bold text-gold">
                      {val}
                    </dt>
                    <dd className="font-mono text-xs uppercase tracking-wider text-platinum/45">
                      {lab}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel-border relative aspect-[16/10] overflow-hidden rounded-sm p-6">
              <svg
                viewBox="0 0 100 60"
                className="h-full w-full"
                aria-label="World trade corridors"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="100" height="60" fill="url(#mapGlow)" />
                {/* Stylized continents */}
                <ellipse cx="22" cy="28" rx="14" ry="16" fill="#111827" stroke="rgba(212,175,55,0.2)" strokeWidth="0.3" />
                <ellipse cx="48" cy="26" rx="10" ry="14" fill="#111827" stroke="rgba(212,175,55,0.2)" strokeWidth="0.3" />
                <ellipse cx="72" cy="32" rx="16" ry="18" fill="#111827" stroke="rgba(212,175,55,0.2)" strokeWidth="0.3" />
                <ellipse cx="82" cy="48" rx="8" ry="6" fill="#111827" stroke="rgba(212,175,55,0.2)" strokeWidth="0.3" />
                {CORRIDORS.map((c, i) => (
                  <line
                    key={i}
                    x1={c.x - 15}
                    y1={c.y}
                    x2={c.x + 10}
                    y2={c.y - 8}
                    stroke="#d4af37"
                    strokeWidth="0.4"
                    strokeDasharray="2 2"
                    className="animate-route-flow"
                    opacity="0.7"
                  />
                ))}
                {[
                  [22, 28],
                  [48, 26],
                  [72, 32],
                  [82, 48],
                  [35, 42],
                  [58, 38],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="1.2" fill="#06b6d4" />
                    <circle cx={x} cy={y} r="2.5" fill="none" stroke="#06b6d4" strokeOpacity="0.4">
                      <animate
                        attributeName="r"
                        values="2;4;2"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-opacity"
                        values="0.5;0;0.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-wider text-platinum/30">
                Live corridor mesh · Sovereign Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section
        id="architecture"
        className="border-y border-gold/10 bg-nebula/30 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-quantum">
              Sovereign Intelligence Architecture
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              How AI coordinates everything
            </h2>
          </div>

          <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-0">
            {[
              { label: "Users", sub: "Enterprise · Founders · Institutions" },
              { label: "Sovereign AI Layer", sub: "Natural language · Voice · Zero-UI", highlight: true },
              { label: "Commerce Modules", sub: "8 integrated capabilities" },
              { label: "Global Network Infrastructure", sub: "186+ countries · Sovereign mesh" },
            ].map((layer, i) => (
              <div key={layer.label} className="flex w-full flex-col items-center">
                <div
                  className={`w-full rounded-sm border px-6 py-5 text-center transition ${
                    layer.highlight
                      ? "border-quantum/50 bg-quantum/10 shadow-[0_0_60px_rgba(6,182,212,0.12)]"
                      : "panel-border"
                  }`}
                >
                  <p
                    className={`font-display text-lg font-semibold ${layer.highlight ? "text-quantum" : "text-gold"}`}
                  >
                    {layer.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-platinum/40">
                    {layer.sub}
                  </p>
                </div>
                {i < 3 && (
                  <div className="flex h-10 flex-col items-center justify-center">
                    <div className="h-full w-px bg-gradient-to-b from-gold/50 to-quantum/50" />
                    <span className="text-gold/60">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80">
              Enterprise Security
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold">
              Infrastructure you can trust
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SECURITY.map((item) => (
              <div
                key={item}
                className="panel-border rounded-sm px-4 py-6 text-center"
              >
                <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center">
                  <span className="text-gold text-xs">✓</span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-platinum/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution */}
      <section className="border-t border-gold/10 bg-nebula py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-quantum">
              Future of Commerce
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              The evolution to autonomous commerce
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
            <div className="grid gap-6 md:grid-cols-4">
              {EVOLUTION.map((step, i) => (
                <div
                  key={step.era}
                  className={`relative rounded-sm border p-6 text-center transition ${
                    step.active
                      ? "border-quantum/50 bg-quantum/10 shadow-[0_0_48px_rgba(6,182,212,0.1)]"
                      : "panel-border"
                  }`}
                >
                  <span className="font-mono text-[10px] text-platinum/35">
                    {step.year}
                  </span>
                  <p
                    className={`mt-2 font-display text-sm font-semibold md:text-base ${step.active ? "text-quantum" : "text-platinum/70"}`}
                  >
                    {step.era}
                  </p>
                  {i < EVOLUTION.length - 1 && (
                    <span className="absolute -right-3 top-1/2 hidden text-gold/40 md:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-xl text-center text-sm text-platinum/50">
              SOVEREIGN is the infrastructure enabling the transition to
              autonomous, AI-native global commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Access CTA */}
      <section id="access" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(212,175,55,0.1),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Image
            src="/sovereign_logo.png"
            alt="SOVEREIGN Global Commerce OS"
            width={480}
            height={140}
            className="mx-auto h-auto w-full max-w-md object-contain"
          />
          <h2 className="mt-10 font-display text-3xl font-bold md:text-4xl">
            Enter the sovereign network
          </h2>
          <p className="mt-4 text-platinum/55">
            Request enterprise access to the global commerce operating system.
          </p>
          <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="enterprise@company.com"
              className="flex-1 rounded-sm border border-platinum/15 bg-nebula px-4 py-3 font-mono text-sm text-platinum placeholder:text-platinum/30 outline-none focus:border-quantum/50 focus:ring-1 focus:ring-quantum/30"
              aria-label="Email address"
            />
            <button
              type="button"
              className="rounded-sm bg-gold px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-obsidian transition hover:bg-[#e8c547]"
            >
              Request Access
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="font-display text-lg font-bold gold-gradient-text">
              SOVEREIGN
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-platinum/40">
              The Global Commerce Operating System
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-wider text-platinum/45">
            <a href="#" className="hover:text-gold">
              Manifesto
            </a>
            <a href="#architecture" className="hover:text-gold">
              Architecture
            </a>
            <a href="#" className="hover:text-gold">
              Enterprise Contact
            </a>
            <a href="#" className="hover:text-gold">
              Global Partnerships
            </a>
            <a href="#access" className="hover:text-gold">
              Request Access
            </a>
          </nav>
          <p className="font-mono text-[10px] text-platinum/30">
            © {new Date().getFullYear()} SOVEREIGN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
