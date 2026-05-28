"use client";

import { useEffect, useRef } from "react";

type Node = { lat: number; lng: number; label: string };

const HUBS: Node[] = [
  { lat: 40.7, lng: -74, label: "NYC" },
  { lat: 51.5, lng: -0.1, label: "LON" },
  { lat: 1.3, lng: 103.8, label: "SGP" },
  { lat: 35.7, lng: 139.7, label: "TYO" },
  { lat: 25.2, lng: 55.3, label: "DXB" },
  { lat: -23.5, lng: -46.6, label: "SAO" },
  { lat: 31.2, lng: 121.5, label: "SHA" },
  { lat: 52.5, lng: 13.4, label: "BER" },
];

const ROUTES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 2],
  [1, 7],
  [7, 5],
  [3, 6],
  [6, 2],
  [0, 5],
];

function project(
  lat: number,
  lng: number,
  cx: number,
  cy: number,
  r: number,
  rot: number,
): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const lam = ((lng + rot) * Math.PI) / 180;
  const x = Math.sin(phi) * Math.cos(lam);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(lam);
  return [cx + x * r, cy - y * r, z];
}

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      rotRef.current += 0.12;
      const rot = rotRef.current;

      ctx.clearRect(0, 0, w, h);

      const grd = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.4);
      grd.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      grd.addColorStop(0.5, "rgba(212, 175, 55, 0.04)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      const globeGrd = ctx.createRadialGradient(
        cx - r * 0.3,
        cy - r * 0.3,
        r * 0.1,
        cx,
        cy,
        r,
      );
      globeGrd.addColorStop(0, "rgba(17, 24, 39, 0.95)");
      globeGrd.addColorStop(1, "rgba(11, 15, 25, 0.98)");
      ctx.fillStyle = globeGrd;
      ctx.fill();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 4) {
          const [px, py, z] = project(lat, lng, cx, cy, r, rot);
          if (z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(6, 182, 212, 0.12)";
        ctx.stroke();
      }

      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const [px, py, z] = project(lat, lng, cx, cy, r, rot);
          if (z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(212, 175, 55, 0.1)";
        ctx.stroke();
      }

      const projected = HUBS.map((n) => {
        const [x, y, z] = project(n.lat, n.lng, cx, cy, r, rot);
        return { ...n, x, y, z };
      });

      ROUTES.forEach(([a, b], i) => {
        const A = projected[a];
        const B = projected[b];
        if (A.z < 0 && B.z < 0) return;
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 30;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(mx, my, B.x, B.y);
        const alpha = Math.min(A.z, B.z) > 0 ? 0.7 : 0.25;
        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 10]);
        ctx.lineDashOffset = -(frame * 0.4 + i * 12);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      projected.forEach((n) => {
        if (n.z < 0.05) return;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12);
        glow.addColorStop(0, "rgba(6, 182, 212, 0.9)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d4af37";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-90"
      aria-hidden
    />
  );
}
