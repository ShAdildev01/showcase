"use client";

import { useState } from "react";
import { AlertCircle, Check, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/BrandIcons";
import { passwordChecks, useAuthForm, type AuthMode } from "@/lib/useAuthForm";
import { cn } from "@/lib/cn";

type Key = "name" | "email" | "password" | "confirm";

const assurances = [
  "SOC 2 Type II audited, report available on request",
  "Data encrypted in transit and at rest",
  "Single sign-on and role-based access included",
];

function Form({ mode }: { mode: AuthMode }) {
  const f = useAuthForm(mode);
  const input = (key: Key) =>
    cn(
      "w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] outline-none transition",
      f.error(key) ? "border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/25" : f.valid(key) ? "border-[#2E7D5B]" : "border-cauth-line focus:border-cauth-brand focus:ring-2 focus:ring-cauth-brand/20"
    );
  const message = (key: Key) =>
    f.error(key) ? (
      <p id={`${mode}-${key}-error`} className="mt-1.5 flex items-start gap-1.5 text-[13px] text-[#B3261E]">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {f.error(key)}
      </p>
    ) : null;

  if (f.status === "success") {
    return (
      <div role="status" className="rounded-md border border-cauth-line bg-white p-6">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2E7D5B] text-white"><Check className="h-5 w-5" /></span>
        <p className="mt-4 font-spectral text-xl font-semibold">{mode === "login" ? "Signed in successfully" : "Your workspace is ready"}</p>
        <p className="mt-1 text-sm text-cauth-mute">This is a demo, so no session was created.</p>
      </div>
    );
  }

  return (
    <form onSubmit={f.submit} noValidate className="space-y-4">
      {f.status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-md border border-[#B3261E]/30 bg-[#B3261E]/5 p-3 text-sm text-[#B3261E]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> The email or password is incorrect. After five attempts the account locks for 15 minutes.
        </p>
      )}
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-name`} className="mb-1.5 block text-sm font-medium">Full name</label>
          <input {...f.field("name")} autoComplete="name" className={input("name")} />
          {message("name")}
        </div>
      )}
      <div>
        <label htmlFor={`${mode}-email`} className="mb-1.5 block text-sm font-medium">Work email</label>
        <input {...f.field("email")} type="email" autoComplete="email" className={input("email")} />
        {message("email")}
      </div>
      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <label htmlFor={`${mode}-password`} className="text-sm font-medium">Password</label>
          {mode === "login" && <a href="#" className="text-[13px] text-cauth-brand underline-offset-2 hover:underline">Forgot password?</a>}
        </div>
        <div className="relative">
          <input {...f.field("password")} type={f.showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={cn(input("password"), "pr-11")} />
          <button type="button" onClick={f.toggleShowPassword} aria-label={f.showPassword ? "Hide password" : "Show password"} className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded text-cauth-mute hover:text-cauth-ink">
            {f.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {message("password")}
        {mode === "signup" && (
          <ul className="mt-2 space-y-1 text-[13px]">
            {passwordChecks(f.values.password).map((c) => (
              <li key={c.label} className={cn("flex items-center gap-2", c.ok ? "text-[#2E7D5B]" : "text-cauth-mute")}>
                <Check className={cn("h-3.5 w-3.5", !c.ok && "opacity-30")} /> {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-confirm`} className="mb-1.5 block text-sm font-medium">Confirm password</label>
          <input {...f.field("confirm")} type={f.showPassword ? "text" : "password"} autoComplete="new-password" className={input("confirm")} />
          {message("confirm")}
        </div>
      )}
      <button type="submit" disabled={f.status === "loading"} className="flex w-full items-center justify-center gap-2 rounded-md bg-cauth-brand py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cauth-ink disabled:opacity-70">
        {f.status === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Verifying</>) : mode === "login" ? "Sign in" : "Create account"}
      </button>
      {mode === "login" && <p className="text-center text-xs text-cauth-mute">Demo tip: the password wrongpass triggers a failed sign-in.</p>}
      <div className="flex items-center gap-3 text-xs text-cauth-mute"><span className="h-px flex-1 bg-cauth-line" />Or use your organisation<span className="h-px flex-1 bg-cauth-line" /></div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-cauth-line bg-white py-2.5 text-sm font-medium transition-colors hover:bg-cauth-bg"><GoogleIcon className="h-4 w-4" /> Google</button>
        <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-cauth-line bg-white py-2.5 text-sm font-medium transition-colors hover:bg-cauth-bg"><MicrosoftIcon className="h-4 w-4" /> Microsoft</button>
      </div>
    </form>
  );
}

export default function CorporateAuth() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="grid min-h-screen bg-cauth-bg font-franklin text-cauth-ink lg:grid-cols-[minmax(320px,0.8fr)_1.2fr]">
      <aside className="border-b border-cauth-line px-6 pb-10 pt-36 sm:px-12 lg:border-b-0 lg:border-r lg:pt-44">
        <p className="flex items-center gap-2 font-spectral text-2xl font-semibold text-cauth-brand"><ShieldCheck className="h-6 w-6" /> Meridian Ledger</p>
        <h1 className="mt-10 max-w-sm font-spectral text-3xl font-medium leading-tight">Financial close, without the spreadsheet chase.</h1>
        <ul className="mt-8 space-y-4 text-[15px] text-cauth-mute">
          {assurances.map((a) => (
            <li key={a} className="flex gap-3"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-cauth-brand" />{a}</li>
          ))}
        </ul>
      </aside>

      <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:py-24">
        <div className="w-full max-w-[420px]">
          <div role="tablist" aria-label="Auth mode" className="mb-7 flex gap-6 border-b border-cauth-line">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={cn("-mb-px border-b-2 pb-3 text-[15px] font-medium transition-colors", mode === m ? "border-cauth-brand text-cauth-ink" : "border-transparent text-cauth-mute hover:text-cauth-ink")}>
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
          <h2 className="mb-6 font-spectral text-2xl font-semibold">{mode === "login" ? "Welcome back" : "Set up your workspace"}</h2>
          <Form key={mode} mode={mode} />
          <p className="mt-8 text-xs leading-relaxed text-cauth-mute">By continuing you agree to the Terms of Service and acknowledge the Privacy Notice.</p>
        </div>
      </section>
    </div>
  );
}
