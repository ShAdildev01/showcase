"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { GithubIcon, GoogleIcon } from "@/components/icons/BrandIcons";
import { passwordChecks, useAuthForm, type AuthMode } from "@/lib/useAuthForm";
import { cn } from "@/lib/cn";

const copy: Record<AuthMode, { headline: string; sub: string }> = {
  login: { headline: "Good to see you again.", sub: "Pick up your boards exactly where you left them." },
  signup: { headline: "Make your first board.", sub: "Free for two people, forever. No card needed." },
};

function Form({ mode }: { mode: AuthMode }) {
  const f = useAuthForm(mode);
  const input = (key: "name" | "email" | "password" | "confirm") =>
    cn(
      "w-full rounded-2xl bg-white px-5 py-4 text-base outline-none ring-2 ring-transparent transition placeholder:text-mauth-ink/35",
      f.error(key) ? "ring-[#D7263D]" : f.valid(key) ? "ring-mauth-pine/60" : "focus:ring-mauth-orange"
    );

  const FieldError = ({ k }: { k: "name" | "email" | "password" | "confirm" }) =>
    f.error(k) ? (
      <p id={`${mode}-${k}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#B81C30]">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {f.error(k)}
      </p>
    ) : null;

  if (f.status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status" className="rounded-3xl bg-mauth-pine p-8 text-mauth-cream">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-mauth-orange text-mauth-ink"><Check className="h-6 w-6" strokeWidth={3} /></span>
        <p className="mt-6 font-unbounded text-2xl leading-tight">{mode === "login" ? "You are in." : "Account created."}</p>
        <p className="mt-2 text-mauth-cream/75">This is a demo, so nothing was saved. Switch tabs to try the other flow.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={f.submit} noValidate className="space-y-5">
      {f.status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-2xl bg-[#D7263D]/10 p-4 text-sm font-medium text-[#B81C30]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> That password does not match this account. Try again or reset it.
        </p>
      )}
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-name`} className="mb-2 block text-sm font-semibold">Full name</label>
          <input {...f.field("name")} autoComplete="name" placeholder="Maya Okafor" className={input("name")} />
          <FieldError k="name" />
        </div>
      )}
      <div>
        <label htmlFor={`${mode}-email`} className="mb-2 block text-sm font-semibold">Email</label>
        <input {...f.field("email")} type="email" autoComplete="email" placeholder="maya@studio.com" className={input("email")} />
        <FieldError k="email" />
      </div>
      <div>
        <label htmlFor={`${mode}-password`} className="mb-2 block text-sm font-semibold">Password</label>
        <div className="relative">
          <input {...f.field("password")} type={f.showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={cn(input("password"), "pr-14")} />
          <button type="button" onClick={f.toggleShowPassword} aria-label={f.showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-mauth-ink/60 hover:bg-mauth-ink/5">
            {f.showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <FieldError k="password" />
        {mode === "signup" && (
          <div className="mt-3">
            <div className="flex gap-1.5" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i < f.strength ? (f.strength < 3 ? "bg-mauth-orange" : "bg-mauth-pine") : "bg-mauth-ink/10")} />
              ))}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {passwordChecks(f.values.password).map((c) => (
                <li key={c.label} className={c.ok ? "font-semibold text-mauth-pine" : "text-mauth-ink/55"}>{c.ok ? "Done: " : ""}{c.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-confirm`} className="mb-2 block text-sm font-semibold">Confirm password</label>
          <input {...f.field("confirm")} type={f.showPassword ? "text" : "password"} autoComplete="new-password" className={input("confirm")} />
          <FieldError k="confirm" />
        </div>
      )}
      <button type="submit" disabled={f.status === "loading"} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-mauth-ink py-4 text-base font-bold text-mauth-cream transition-colors hover:bg-mauth-pine disabled:opacity-70">
        {f.status === "loading" ? (<><Loader2 className="h-5 w-5 animate-spin" /> {mode === "login" ? "Logging in" : "Creating account"}</>) : mode === "login" ? "Log in" : "Create account"}
      </button>
      {mode === "login" && <p className="text-center text-xs text-mauth-ink/55">Demo tip: use the password wrongpass to see a failed login.</p>}
      <div className="flex items-center gap-4 text-sm text-mauth-ink/55"><span className="h-px flex-1 bg-mauth-ink/15" />or continue with<span className="h-px flex-1 bg-mauth-ink/15" /></div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="flex items-center justify-center gap-2.5 rounded-2xl bg-white py-3.5 text-sm font-semibold ring-1 ring-mauth-ink/10 transition hover:-translate-y-0.5 hover:ring-mauth-ink/30"><GoogleIcon className="h-5 w-5" /> Google</button>
        <button type="button" className="flex items-center justify-center gap-2.5 rounded-2xl bg-white py-3.5 text-sm font-semibold ring-1 ring-mauth-ink/10 transition hover:-translate-y-0.5 hover:ring-mauth-ink/30"><GithubIcon className="h-5 w-5" /> GitHub</button>
      </div>
    </form>
  );
}

export default function ModernAuth() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="grid min-h-screen font-manrope text-mauth-ink lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative overflow-hidden bg-mauth-orange px-6 pb-10 pt-36 sm:px-12 lg:pb-16 lg:pt-44">
        <div aria-hidden className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-mauth-pine lg:h-[26rem] lg:w-[26rem]" />
        <div aria-hidden className="absolute bottom-24 right-24 hidden h-40 w-40 rounded-[2.5rem] bg-mauth-cream lg:block" />
        <div aria-hidden className="absolute -left-10 top-1/2 hidden h-52 w-52 rounded-full border-[28px] border-mauth-ink lg:block" />
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-md">
            <h1 className="font-unbounded text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-mauth-ink">{copy[mode].headline}</h1>
            <p className="mt-5 max-w-xs text-lg font-medium text-mauth-ink/80">{copy[mode].sub}</p>
          </motion.div>
        </AnimatePresence>
      </aside>

      <section className="flex items-center bg-mauth-cream px-6 py-12 sm:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-md">
          <div role="tablist" aria-label="Auth mode" className="mb-8 flex rounded-2xl bg-mauth-ink/[0.06] p-1.5">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={cn("relative flex-1 rounded-xl py-2.5 text-sm font-bold transition-colors", mode === m ? "text-mauth-cream" : "text-mauth-ink/60")}>
                {mode === m && <motion.span layoutId="mauth-tab" className="absolute inset-0 rounded-xl bg-mauth-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{m === "login" ? "Log in" : "Sign up"}</span>
              </button>
            ))}
          </div>
          <Form key={mode} mode={mode} />
        </div>
      </section>
    </div>
  );
}
