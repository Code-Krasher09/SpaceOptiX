import Link from "next/link";

import { Building2, Calendar, CheckCircle2, Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)] bg-[size:48px_48px]" />
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
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-indigo-500/30 text-blue-200">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              SpaceOptiX
            </span>
          </span>
        </Link>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Smart Venue System
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="animate-in fade-in duration-300">
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                  Campus venue operations
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
                  Streamlined requests, approvals, and availability tracking.
                </h1>
                <p className="mt-3 text-sm text-slate-400">
                  SpaceOptiX keeps your campus booking pipeline aligned with
                  real-time permissions and transparent status updates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                  <Calendar className="mt-0.5 h-5 w-5 text-blue-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Availability-first planning
                    </p>
                    <p className="text-sm text-slate-400">
                      Check venue windows and blackout constraints instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Approval clarity
                    </p>
                    <p className="text-sm text-slate-400">
                      Pre-approval and final approval stay visible at every
                      step.
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
                      Assign approvals and blackout control per venue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 text-center">
                  <p className="text-lg font-bold text-slate-100">24/7</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Visibility
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 text-center">
                  <p className="text-lg font-bold text-slate-100">2-Step</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Approvals
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 text-center">
                  <p className="text-lg font-bold text-slate-100">Fast</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Response
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-in fade-in duration-300 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 shadow-2xl shadow-blue-500/5 backdrop-blur-xl">
            {children}
          </section>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs text-slate-500">
        © 2026 SpaceOptiX. All rights reserved.
      </footer>
    </div>
  );
}
