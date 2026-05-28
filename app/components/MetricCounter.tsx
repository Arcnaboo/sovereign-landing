"use client";

import { useEffect, useRef, useState } from "react";

export function MetricCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.floor(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const formatted = (() => {
    if (value >= 1_000_000_000) {
      const b = display / 1_000_000_000;
      return `${b >= 10 ? Math.round(b) : b.toFixed(1)}B`.replace(/\.0B$/, "B");
    }
    if (value >= 1_000_000) {
      const m = display / 1_000_000;
      return `${m >= 10 ? Math.round(m) : m.toFixed(1)}M`.replace(/\.0M$/, "M");
    }
    if (value >= 10_000) {
      const k = display / 1000;
      return `${k >= 100 ? Math.round(k) : k.toFixed(1)}K`.replace(/\.0K$/, "K");
    }
    return display.toLocaleString();
  })();

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold tracking-tight text-gold md:text-5xl">
        {formatted}
        <span className="text-2xl text-gold/70">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-platinum/50">
        {label}
      </p>
    </div>
  );
}
