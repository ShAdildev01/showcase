"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/halden";
import Elevation from "./Elevation";

export default function HaldenSite() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <div className="bg-paper-bg font-figtree text-paper-ink">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-40 sm:px-8 lg:grid-cols-12">
        <h1 className="font-instrument text-[clamp(3.25rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em] lg:col-span-9">
          Buildings that know where the light comes from.
        </h1>
        <div className="flex flex-col justify-end gap-6 lg:col-span-3">
          <p className="leading-relaxed text-paper-mute">
            Halden is a small architecture practice in Bristol. We design houses, libraries and housing that are easy to live in and slow to date.
          </p>
          <a href="#work" className="group inline-flex w-fit items-center gap-2 border-b border-paper-ink pb-1 font-medium">
            See recent work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      <section id="work" className="bg-paper-tint px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-6">
            {projects.map((p, i) => (
              <li key={p.slug} className="border-b border-paper-ink/15 first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="flex w-full items-baseline justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-instrument text-4xl transition-all duration-500 ease-out sm:text-5xl ${active === i ? "translate-x-3 text-paper-moss" : "text-paper-ink/45"}`}>
                    {p.name}
                  </span>
                  <span className="shrink-0 text-sm text-paper-mute">{p.year}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-paper-ink/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.slug}
                    className="h-full w-full"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Elevation variant={active} tone={project.tone} accent={project.accent} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6 text-sm">
                <p className="font-medium">{project.kind}</p>
                <p className="text-paper-mute">{project.place}</p>
              </div>
              <p className="mt-2 max-w-md leading-relaxed text-paper-mute">{project.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-instrument text-5xl leading-none tracking-tight">Eleven people, one long table.</h2>
        </div>
        <div className="space-y-5 leading-[1.75] text-paper-mute lg:col-span-5 lg:col-start-7">
          <p>We keep the team small so the person who draws the first line is the person who walks the finished building with you.</p>
          <p>Every project starts with a week on site, watching where the sun lands at nine, noon and five. The plan follows from there.</p>
          <a href="mailto:studio@halden.example" className="inline-block rounded-full bg-paper-moss px-7 py-3 font-medium text-paper-bg transition-colors hover:bg-paper-ink">
            Start a conversation
          </a>
        </div>
      </section>
    </div>
  );
}
