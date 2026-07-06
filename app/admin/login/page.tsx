import { Suspense } from "react";
import Link from "next/link";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grain flex min-h-screen items-center justify-center bg-obsidian px-6 text-platinum">
      <div className="panel-border w-full max-w-md rounded-sm p-8">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-wider text-platinum/40 hover:text-gold"
        >
          ← Back to site
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold gold-gradient-text">
          SOVEREIGN Admin
        </h1>
        <p className="mt-2 text-sm text-platinum/50">
          Sign in to manage site content.
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-platinum/40">Loading...</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
