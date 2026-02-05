"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const department = String(formData.get("department") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, department, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error?.message ?? "Registration failed");
        return;
      }

      const tokenNote = data.verificationToken
        ? ` Verification token: ${data.verificationToken}`
        : "";
      setMessage(
        `Registration successful. Check your email for verification.${tokenNote}`,
      );
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <UserPlus className="h-3.5 w-3.5" />
          Student access
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Create account
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Student registration only. Verify your email to activate.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Full name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Student name"
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Institutional email
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
            Department
          </label>
          <input
            type="text"
            name="department"
            placeholder="Department"
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
            placeholder="Create a password"
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 hover:border-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
            {message}
          </p>
        )}
        <button
          type="submit"
          className="relative w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          <span className={loading ? "opacity-0" : "opacity-100"}>
            Register
          </span>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </span>
          )}
        </button>
      </form>
      <div className="text-sm text-slate-400">
        Already registered?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Sign in
        </Link>
      </div>
    </div>
  );
}
