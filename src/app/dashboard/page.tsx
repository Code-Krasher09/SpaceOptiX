import Link from "next/link";
import { Calendar, CheckCircle2, Shield, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>
      <div className="pointer-events-none absolute -top-24 left-10 h-64 w-64 rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
      <div
        className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-[140px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            SpaceOptiX
          </span>
        </Link>
        <Link
          href="/logout"
          className="text-sm text-slate-400 hover:text-slate-200"
        >
          Sign out
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="animate-in fade-in duration-300">
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                  Temporary Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
                  Your workspace is ready.
                </h1>
                <p className="mt-3 text-sm text-slate-400">
                  This dashboard will evolve into role-specific views. Use it
                  for testing authentication and navigation during Week 4.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                  <Calendar className="mt-0.5 h-5 w-5 text-blue-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Venue availability
                    </p>
                    <p className="text-sm text-slate-400">
                      Preview scheduling and blackouts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Approval flow
                    </p>
                    <p className="text-sm text-slate-400">
                      Track pre-approval and final approval queues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                  <Shield className="mt-0.5 h-5 w-5 text-indigo-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Permission-based access
                    </p>
                    <p className="text-sm text-slate-400">
                      Assign control to approvers and venue admins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-in fade-in duration-300 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 shadow-2xl shadow-blue-500/5 backdrop-blur-xl">
            <h2 className="text-2xl font-bold tracking-tight">Quick actions</h2>
            <p className="mt-2 text-sm text-slate-400">
              Jump to key workflows (placeholder links for now).
            </p>
            <div className="mt-6 space-y-3">
              {["View venues", "Create booking", "Review approvals"].map(
                (label) => (
                  <button
                    key={label}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-500/60"
                  >
                    <span>{label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                ),
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs text-slate-500">
        © 2026 SpaceOptiX. All rights reserved.
      </footer>
    </div>
  );
}
