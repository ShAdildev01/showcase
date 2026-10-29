"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import TiltStack from "./TiltStack";

const OrbitScene = dynamic(() => import("./OrbitScene"), {
  ssr: false,
  loading: () => <div className="mx-auto mt-24 h-64 w-64 animate-pulse rounded-full bg-orbit-ink/5" />,
});

const scenes = [
  { name: "Lantern configurator", spec: "Six finishes, live lighting, 90 KB of geometry.", client: "Hollis Lighting" },
  { name: "Aperture lens study", spec: "Scroll-driven teardown of a 35 mm prime.", client: "Marrow Optics" },
  { name: "Tidal chair film", spec: "Real-time product film, no video file.", client: "Nord & Fen" },
];

export default function OrbitSite() {
  return (
    <div className="bg-orbit-bg font-dmsans text-orbit-ink">
      <section className="relative isolate min-h-[100svh] overflow-hidden px-5 pb-12 pt-28 sm:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_65%_45%,#F3EFE6,transparent_70%)]" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]" role="img" aria-label="Interactive 3D sculpture. Move your pointer to turn it.">
          <OrbitScene />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] max-w-7xl flex-col justify-between">
          <div>
            <p className="text-sm text-orbit-mute">Ossa, studio for digital objects</p>
            <h1 className="mt-5 max-w-[11ch] font-syne text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              Objects you can turn over.
            </h1>
          </div>
          <div className="pointer-events-auto flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm leading-relaxed text-orbit-mute">
              We build product films and configurators that run in the browser. No plugin, no pre-render, no loading bar longer than a breath.
            </p>
            <a href="#scenes" className="w-fit rounded-full bg-orbit-ink px-7 py-3.5 text-sm font-medium text-orbit-surface transition-colors hover:bg-orbit-accent">
              See selected scenes
            </a>
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-5 right-6 hidden text-xs text-orbit-mute sm:block">
          Move the pointer to turn the form
        </motion.p>
      </section>

      <section id="scenes" className="bg-orbit-surface px-5 py-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-syne text-4xl font-bold tracking-tight sm:text-5xl">Three scenes from this year</h2>
            <ul className="mt-12 divide-y divide-orbit-ink/15 border-y border-orbit-ink/15">
              {scenes.map((s) => (
                <li key={s.name} className="grid gap-1 py-6 transition-[padding] duration-500 ease-out hover:pl-4">
                  <p className="text-sm text-orbit-mute">{s.client}</p>
                  <p className="font-syne text-2xl font-semibold tracking-tight">{s.name}</p>
                  <p className="text-orbit-mute">{s.spec}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <TiltStack />
            <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-relaxed text-orbit-mute">
              Every scene is built in layers: surface, frame, signal. Hover the plates to feel the depth.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <p className="max-w-xl font-syne text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Have an object that deserves more than a photo?</p>
          <a href="mailto:hello@ossa.studio" className="w-fit border-b-2 border-orbit-accent pb-1 text-lg transition-colors hover:text-orbit-accent">hello@ossa.studio</a>
        </div>
      </section>
    </div>
  );
}
