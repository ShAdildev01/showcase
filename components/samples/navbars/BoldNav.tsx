"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Plus, X } from "lucide-react";
import DemoFrame from "./DemoFrame";

const links = ["Work", "Studio", "Journal", "Contact"];
const ticker = "Booking autumn projects / Branding / Packaging / Motion / Booking autumn projects / ";

export default function BoldNav() {
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll({ container: scroller });
  const size = useTransform(scrollY, [0, 180], [132, 40]);
  const pad = useTransform(scrollY, [0, 180], [12, 4]);

  return (
    <div className="px-3 pb-16 pt-36 sm:px-6">
      <DemoFrame ref={scroller} url="blok.example">
        <div className="relative bg-bold-bone font-archivo text-bold-black">
          <div className="sticky top-0 z-20">
            <div className="overflow-hidden bg-bold-red py-1.5 text-sm font-semibold text-bold-bone">
              <div className="flex w-max animate-marquee whitespace-pre">
                <span>{ticker.repeat(3)}</span>
                <span aria-hidden>{ticker.repeat(3)}</span>
              </div>
            </div>
            <motion.header style={{ paddingTop: pad, paddingBottom: pad }} className="flex items-center justify-between border-b-2 border-bold-black bg-bold-bone px-5 sm:px-8">
              <motion.a href="#" style={{ fontSize: size }} className="font-bigshoulders font-black leading-[0.85] tracking-[-0.02em]">
                BLOK
              </motion.a>
              <nav aria-label="Demo primary" className="hidden items-center gap-1 md:flex">
                {links.map((l) => (
                  <a key={l} href="#" className="rounded-full border-2 border-transparent px-4 py-2 text-lg font-bold transition-all duration-300 ease-out hover:-skew-x-6 hover:border-bold-black hover:bg-bold-black hover:text-bold-bone">{l}</a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => { scroller.current?.scrollTo({ top: 0 }); setOpen(true); }}
                aria-expanded={open}
                className="flex items-center gap-2 rounded-full bg-bold-black py-2 pl-5 pr-2 text-lg font-bold text-bold-bone transition-colors hover:bg-bold-red"
              >
                Menu
                <span className="grid h-9 w-9 place-items-center rounded-full bg-bold-bone text-bold-black"><Plus className="h-5 w-5" strokeWidth={3} /></span>
              </button>
            </motion.header>
          </div>

          <section className="px-5 pb-24 pt-16 sm:px-8">
            <h1 className="max-w-4xl font-bigshoulders text-[clamp(4rem,13vw,11rem)] font-black leading-[0.82] tracking-[-0.02em]">We make brands that shout politely.</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed">Scroll down: the wordmark shrinks, the bar tightens, and the menu opens as a curtain.</p>
          </section>
          <section className="bg-bold-black px-5 py-24 text-bold-bone sm:px-8">
            <p className="max-w-3xl font-bigshoulders text-6xl font-extrabold leading-[0.9] sm:text-8xl">Loud when it helps. Quiet when it matters.</p>
          </section>
          <section className="px-5 py-24 sm:px-8"><p className="max-w-xl text-2xl font-semibold leading-snug">Twenty-three identities shipped this year, from oat-milk labels to a regional airline.</p></section>
          <div className="h-48" />

          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="absolute inset-x-0 top-0 z-30 h-[min(76vh,720px)] bg-bold-black text-bold-bone"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="flex justify-end p-5 sm:p-8">
                  <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-full bg-bold-red py-2 pl-5 pr-2 text-lg font-bold text-bold-bone">
                    Close <span className="grid h-9 w-9 place-items-center rounded-full bg-bold-bone text-bold-black"><X className="h-5 w-5" strokeWidth={3} /></span>
                  </button>
                </div>
                <ul className="px-5 sm:px-8">
                  {links.map((l, i) => (
                    <li key={l} className="overflow-hidden">
                      <motion.a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setOpen(false); }}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="block font-bigshoulders text-[clamp(3.5rem,13vw,8rem)] font-black leading-[0.9] transition-all duration-300 ease-out hover:translate-x-4 hover:text-bold-red"
                      >
                        {l}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  );
}
