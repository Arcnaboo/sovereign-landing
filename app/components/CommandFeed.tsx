"use client";

const EVENTS = [
  { time: "14:02:41", type: "MATCH", msg: "Buyer ↔ Supplier linked — Istanbul → Hamburg" },
  { time: "14:02:38", type: "ROUTE", msg: "Supply chain optimized — Rotterdam → Singapore" },
  { time: "14:02:35", type: "SIGNAL", msg: "Market opportunity flagged — ASEAN logistics" },
  { time: "14:02:31", type: "CAPITAL", msg: "Investor interest — Series B climate tech" },
  { time: "14:02:28", type: "COMPLY", msg: "Regional compliance verified — EU export" },
  { time: "14:02:24", type: "MATCH", msg: "Executive network — Dubai ↔ São Paulo" },
  { time: "14:02:20", type: "ROUTE", msg: "Shipment orchestrated — Shanghai → Los Angeles" },
  { time: "14:02:17", type: "SIGNAL", msg: "Acquisition scan — Southeast Asia manufacturing" },
];

const TYPE_COLOR: Record<string, string> = {
  MATCH: "text-quantum",
  ROUTE: "text-gold",
  SIGNAL: "text-platinum",
  CAPITAL: "text-quantum",
  COMPLY: "text-gold/80",
};

export function CommandFeed() {
  const doubled = [...EVENTS, ...EVENTS];

  return (
    <div className="relative h-64 overflow-hidden mask-linear-fade md:h-80">
      <div
        className="flex flex-col gap-3"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {doubled.map((e, i) => (
          <div
            key={`${e.time}-${i}`}
            className="panel-border flex items-start gap-4 rounded-sm px-4 py-3 font-mono text-xs"
          >
            <span className="shrink-0 text-platinum/30">{e.time}</span>
            <span
              className={`shrink-0 font-semibold tracking-wider ${TYPE_COLOR[e.type] ?? "text-platinum"}`}
            >
              {e.type}
            </span>
            <span className="text-platinum/70">{e.msg}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-obsidian to-transparent" />
    </div>
  );
}
