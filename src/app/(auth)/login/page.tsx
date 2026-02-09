"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error?.message ?? "Login failed");
        return;
      }

      router.push(params.get("returnTo") || "/dashboard");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <LogIn className="h-3.5 w-3.5" />
          Access Portal
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Sign in</h2>
        <p className="mt-1 text-sm text-slate-400">
          Enter your email and password to continue.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@college.edu"
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="relative w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          <span className={loading ? "opacity-0" : "opacity-100"}>Sign in</span>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </span>
          )}
        </button>
      </form>
      <div className="flex items-center justify-between text-sm text-slate-400">
        <Link href="/register" className="text-blue-400 hover:text-blue-300">
          Create an account
        </Link>
        <Link href="/verify" className="hover:text-slate-200">
          Verify email
        </Link>
      </div>
    </div>
  );
}
