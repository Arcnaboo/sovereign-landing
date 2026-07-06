"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Invalid username or password");
      setLoading(false);
      return;
    }

    const from = searchParams.get("from") || "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-platinum/50"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-sm border border-platinum/15 bg-obsidian px-4 py-3 font-mono text-sm text-platinum outline-none focus:border-quantum/50"
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-platinum/50"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-sm border border-platinum/15 bg-obsidian px-4 py-3 font-mono text-sm text-platinum outline-none focus:border-quantum/50"
          autoComplete="current-password"
          required
        />
      </div>
      {error && (
        <p className="font-mono text-sm text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-gold px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-obsidian transition hover:bg-[#e8c547] disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
