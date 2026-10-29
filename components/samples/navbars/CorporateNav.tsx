"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { menu } from "@/data/corporate";
import { cn } from "@/lib/cn";
import DemoFrame from "./DemoFrame";

function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-20 bg-white font-sourcesans shadow-[0_1px_0_#DDE2EA]" onMouseLeave={() => setOpen(null)}>
      <div className="hidden items-center justify-between bg-corp-navy px-8 py-1.5 text-xs text-white/75 md:flex">
        <p>Regulated by the Financial Conduct Authority</p>
        <p className="flex items-center gap-4"><span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> +44 20 7946 0113</span><span>Client login</span></p>
      </div>

      <div className="flex h-16 items-center justify-between px-5 md:px-8">
        <a href="#" className="flex items-center gap-2.5 text-corp-navy">
          <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden><path d="M4 24V4l20 20V4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /><circle cx="24" cy="4" r="2.2" fill="#B58B3C" /></svg>
          <span className="font-sourceserif text-xl font-semibold tracking-tight">Northgate</span>
        </a>

        <nav aria-label="Demo primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {menu.map((item, i) => (
              <li key={item.label} onMouseEnter={() => item.columns && setOpen(i)}>
                {item.columns ? (
                  <button
                    type="button"
                    aria-expanded={open === i}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === i ? null : i)}
                    className={cn("flex items-center gap-1 rounded px-3.5 py-2 text-[15px] font-semibold transition-colors", open === i ? "text-corp-gold" : "text-corp-ink hover:text-corp-navy2")}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open === i && "rotate-180")} />
                  </button>
                ) : (
                  <a href="#" className="block rounded px-3.5 py-2 text-[15px] font-semibold text-corp-ink hover:text-corp-navy2" onMouseEnter={() => setOpen(null)}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" className="hidden rounded bg-corp-navy px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-corp-navy2 md:block">Speak to an advisor</a>
          <button type="button" className="grid h-10 w-10 place-items-center rounded md:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && menu[open].columns && (
          <motion.div
            key="mega"
            className="absolute inset-x-0 top-full hidden border-t border-corp-line bg-white shadow-[0_30px_40px_-20px_rgba(17,36,62,0.25)] md:block"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-12 gap-8 px-8 py-8">
              <div className="col-span-8 grid grid-cols-2 gap-8">
                {menu[open].columns!.map((col) => (
                  <div key={col.heading}>
                    <p className="mb-3 border-b border-corp-line pb-2 font-sourceserif text-sm font-semibold text-corp-gold">{col.heading}</p>
                    <ul className="space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a href="#" className="group block">
                            <span className="font-semibold text-corp-ink group-hover:text-corp-navy2">{l.label}</span>
                            <span className="block text-sm text-corp-mute">{l.note}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {menu[open].feature && (
                <a href="#" className="group col-span-4 flex flex-col justify-between rounded bg-corp-navy p-6 text-white">
                  <div>
                    <p className="font-sourceserif text-xl leading-snug">{menu[open].feature!.title}</p>
                    <p className="mt-2 text-sm text-white/70">{menu[open].feature!.text}</p>
                  </div>
                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-corp-gold">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobile && (
        <ul className="border-t border-corp-line bg-white px-5 py-3 md:hidden">
          {menu.map((item) => (
            <li key={item.label} className="border-b border-corp-line py-3 text-[15px] font-semibold last:border-0">{item.label}</li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default function CorporateNav() {
  return (
    <div className="px-3 pb-16 pt-36 sm:px-6">
      <DemoFrame url="northgate.example">
        <div className="bg-corp-bg font-sourcesans text-corp-ink">
          <Header />
          <section className="bg-corp-navy px-6 py-20 text-white md:px-14">
            <h1 className="max-w-2xl font-sourceserif text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">Capital with a long memory.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/75">Northgate has advised and invested alongside owner-managed companies for 31 years.</p>
          </section>
          <section className="grid gap-px bg-corp-line md:grid-cols-3">
            {[["$14.2bn", "assets under management"], ["31 years", "of continuous partnership"], ["212", "companies financed"]].map(([v, l]) => (
              <div key={l} className="bg-white px-8 py-10"><p className="font-sourceserif text-4xl font-semibold text-corp-navy">{v}</p><p className="mt-1 text-corp-mute">{l}</p></div>
            ))}
          </section>
          <section className="px-6 py-16 md:px-14"><p className="max-w-xl text-lg leading-relaxed text-corp-mute">Open Solutions or Industries above to see the mega-menu. Press Escape or click outside to close it.</p></section>
          <div className="h-80" />
        </div>
      </DemoFrame>
    </div>
  );
}
