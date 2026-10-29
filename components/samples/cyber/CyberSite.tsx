"use client";

import { useState } from "react";
import { ChevronRight, Radar } from "lucide-react";
import { services, stats } from "@/data/cyber";
import ShieldMark from "./ShieldMark";
import Terminal from "./Terminal";

export default function CyberSite() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  return (
    <div className="relative overflow-hidden bg-cyber-bg font-chakra text-cyber-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(44,245,207,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(44,245,207,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-line px-3 py-1 font-jbmono text-xs text-cyber-neon">
            <Radar className="h-3.5 w-3.5" /> Kestrel Security, offensive testing since 2016
          </p>
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">We break in before they do.</h1>
          <p className="mt-6 max-w-lg font-jbmono text-sm leading-7 text-cyber-mute">
            Our operators attack your systems the way a motivated criminal would, then sit with your engineers until every door is closed.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-md bg-cyber-neon px-6 py-3 font-semibold text-cyber-bg shadow-[0_0_30px_-4px_rgba(44,245,207,0.6)] transition-transform duration-300 ease-out hover:-translate-y-0.5">
              Book an assessment
            </a>
            <a href="#services" className="rounded-md border border-cyber-line px-6 py-3 text-cyber-text transition-colors hover:border-cyber-neon hover:text-cyber-neon">
              What we test
            </a>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <ShieldMark className="absolute -right-3 -top-24 hidden h-40 w-32 sm:block" />
          <Terminal />
        </div>
      </section>

      <section className="relative border-y border-cyber-line bg-cyber-panel/60">
        <dl className="mx-auto grid max-w-7xl divide-y divide-cyber-line px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse py-8 sm:px-8 sm:first:pl-0">
              <dt className="font-jbmono text-xs text-cyber-mute">{s.label}</dt>
              <dd className="mb-1 text-4xl font-bold text-cyber-neon">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <h2 className="max-w-md text-3xl font-bold tracking-tight sm:text-4xl">Pick the attack surface. We pick the angle.</h2>
        <ul className="mt-12 border-t border-cyber-line">
          {services.map((s) => (
            <li key={s.id} className="group grid items-center gap-2 border-b border-cyber-line py-6 transition-colors hover:bg-cyber-panel sm:grid-cols-[100px_1fr_auto] sm:gap-8 sm:px-4">
              <span className="font-jbmono text-xs text-cyber-neon">{s.id}</span>
              <div>
                <p className="text-xl font-semibold">{s.name}</p>
                <p className="mt-1 max-w-xl font-jbmono text-[13px] leading-6 text-cyber-mute">{s.detail}</p>
              </div>
              <span className="flex items-center gap-1 font-jbmono text-xs text-cyber-mute">
                {s.level}
                <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-cyber-neon" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="relative mx-auto max-w-3xl px-5 pb-28 sm:px-8">
        <div className="rounded-xl border border-cyber-line bg-cyber-panel p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Request a scoping call</h2>
          <p className="mt-2 font-jbmono text-[13px] text-cyber-mute">Leave a work email. An operator replies within one business day.</p>
          {sent ? (
            <p role="status" className="mt-6 font-jbmono text-sm text-cyber-neon">{"> request queued. watch your inbox."}</p>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) setSent(true);
              }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1">
                <label htmlFor="cyber-email" className="sr-only">Work email</label>
                <input
                  id="cyber-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-cyber-line bg-cyber-bg px-4 py-3 font-jbmono text-sm outline-none transition focus:border-cyber-neon focus:shadow-[0_0_0_3px_rgba(44,245,207,0.18)]"
                />
              </div>
              <button type="submit" disabled={!valid} className="rounded-md bg-cyber-neon px-6 py-3 font-semibold text-cyber-bg transition disabled:cursor-not-allowed disabled:opacity-40">
                Send request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
