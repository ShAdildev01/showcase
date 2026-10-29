"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = ["Twelve rooms,", "each built to feel", "like somewhere else."];

export default function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-[15%] top-[8%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(235,164,58,0.28),transparent)]" />
        <div className="absolute -right-[25%] bottom-[-20%] h-[80vmax] w-[80vmax] animate-drift-slow rounded-full bg-[radial-gradient(closest-side,rgba(38,110,92,0.55),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,#0A1411)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12">
        <h1 className="font-fraunces text-[clamp(2.75rem,8.6vw,8rem)] font-light leading-[0.95] tracking-[-0.035em] lg:col-span-10">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
              >
                {i === 1 ? <span className="pl-[0.6em]">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="flex max-w-sm flex-col gap-7 lg:col-span-2 lg:col-start-11 lg:max-w-none lg:self-end"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
        >
          <p className="text-[15px] leading-relaxed text-home-mute">
            Sites, dashboards, navigation and sign-in flows. Every one has its own type, palette and pace.
          </p>
          <Link
            href="/showcase"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-home-accent py-3 pl-6 pr-3 font-medium text-home-bg transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            Enter the gallery
            <span className="grid h-8 w-8 place-items-center rounded-full bg-home-bg text-home-accent transition-transform duration-300 ease-out group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
