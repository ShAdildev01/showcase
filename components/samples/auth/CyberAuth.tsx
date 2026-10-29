"use client";

import { useState } from "react";
import { passwordChecks, useAuthForm, type AuthMode } from "@/lib/useAuthForm";
import { GithubIcon, GoogleIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/cn";

type Key = "name" | "email" | "password" | "confirm";

function Form({ mode }: { mode: AuthMode }) {
  const f = useAuthForm(mode);

  const input = (key: Key) =>
    cn(
      "w-full border-b bg-transparent px-1 py-2 text-tauth-text caret-tauth-green outline-none transition placeholder:text-tauth-dim",
      f.error(key) ? "border-tauth-err shadow-[0_8px_16px_-10px_#FF5C5C]" : "border-tauth-dim focus:border-tauth-green focus:shadow-[0_8px_18px_-8px_#6BFF7A]"
    );
  const line = (key: Key) => (f.error(key) ? <p id={`${mode}-${key}-error`} className="mt-1 text-xs text-tauth-err">ERR {f.error(key)}</p> : null);

  if (f.status === "success") {
    return (
      <div role="status" className="space-y-1 text-sm text-tauth-green">
        <p>{"> verifying credentials ... ok"}</p>
        <p>{"> issuing session token ... ok"}</p>
        <p className="pt-2">{mode === "login" ? "ACCESS GRANTED" : "ACCOUNT CREATED"}</p>
        <p className="text-tauth-dim">demo only, nothing was stored</p>
      </div>
    );
  }

  return (
    <form onSubmit={f.submit} noValidate className="space-y-6">
      {f.status === "failed" && <p role="alert" className="text-sm text-tauth-err">ACCESS DENIED. credentials rejected, 4 attempts remaining.</p>}
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-name`} className="text-xs text-tauth-dim">handle:</label>
          <input {...f.field("name")} autoComplete="name" placeholder="ada_l" className={input("name")} />
          {line("name")}
        </div>
      )}
      <div>
        <label htmlFor={`${mode}-email`} className="text-xs text-tauth-dim">email:</label>
        <input {...f.field("email")} type="email" autoComplete="email" placeholder="operator@domain.io" className={input("email")} />
        {line("email")}
      </div>
      <div>
        <label htmlFor={`${mode}-password`} className="text-xs text-tauth-dim">passphrase:</label>
        <div className="relative">
          <input {...f.field("password")} type={f.showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={cn(input("password"), "pr-20")} />
          <button type="button" onClick={f.toggleShowPassword} aria-pressed={f.showPassword} aria-label={f.showPassword ? "Hide password" : "Show password"} className="absolute right-0 top-1/2 -translate-y-1/2 px-1 text-xs text-tauth-dim transition-colors hover:text-tauth-green">
            [{f.showPassword ? "hide" : "show"}]
          </button>
        </div>
        {line("password")}
        {mode === "signup" && (
          <ul className="mt-2 space-y-0.5 text-xs">
            {passwordChecks(f.values.password).map((c) => (
              <li key={c.label} className={c.ok ? "text-tauth-green" : "text-tauth-dim"}>[{c.ok ? "x" : " "}] {c.label}</li>
            ))}
          </ul>
        )}
      </div>
      {mode === "signup" && (
        <div>
          <label htmlFor={`${mode}-confirm`} className="text-xs text-tauth-dim">repeat passphrase:</label>
          <input {...f.field("confirm")} type={f.showPassword ? "text" : "password"} autoComplete="new-password" className={input("confirm")} />
          {line("confirm")}
        </div>
      )}
      <button type="submit" disabled={f.status === "loading"} className="w-full border border-tauth-green py-3 text-sm text-tauth-green transition hover:bg-tauth-green hover:text-tauth-bg hover:shadow-[0_0_24px_#6BFF7A66] disabled:opacity-60">
        {f.status === "loading" ? "authenticating ..." : mode === "login" ? "$ ssh --login" : "$ useradd --create"}
      </button>
      {mode === "login" && <p className="text-xs text-tauth-dim">hint: passphrase wrongpass simulates a rejected login</p>}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button type="button" className="flex items-center justify-center gap-2 border border-tauth-dim py-2.5 text-xs transition-colors hover:border-tauth-green hover:text-tauth-green"><GithubIcon className="h-4 w-4" /> [ github ]</button>
        <button type="button" className="flex items-center justify-center gap-2 border border-tauth-dim py-2.5 text-xs transition-colors hover:border-tauth-green hover:text-tauth-green"><GoogleIcon className="h-4 w-4" /> [ google ]</button>
      </div>
    </form>
  );
}

export default function CyberAuth() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-tauth-bg px-4 pb-12 pt-32 font-firacode text-tauth-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(107,255,122,0.045)_0,rgba(107,255,122,0.045)_1px,transparent_1px,transparent_3px)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(107,255,122,0.16),transparent)]" />

      <div className="relative w-full max-w-md border border-tauth-dim bg-tauth-panel shadow-[0_0_60px_-20px_#6BFF7A55]">
        <div className="flex items-center justify-between border-b border-tauth-dim px-4 py-2 text-xs text-tauth-dim">
          <span>sentinel://auth</span>
          <span role="tablist" aria-label="Auth mode" className="flex gap-3">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={cn("transition-colors", mode === m ? "text-tauth-green" : "hover:text-tauth-text")}>
                {mode === m ? `[${m === "login" ? "login" : "register"}]` : m === "login" ? "login" : "register"}
              </button>
            ))}
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs text-tauth-dim">{"// secure shell for the Sentinel network"}</p>
          <h1 className="mb-8 mt-2 text-2xl text-tauth-green">
            {mode === "login" ? "authenticate" : "provision account"}
            <span className="ml-1 inline-block h-5 w-2.5 translate-y-0.5 animate-blink bg-tauth-green" />
          </h1>
          <Form key={mode} mode={mode} />
        </div>
      </div>
    </div>
  );
}
