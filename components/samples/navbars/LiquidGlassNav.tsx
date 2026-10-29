"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import DemoFrame from "./DemoFrame";

const links = ["Journeys", "Stays", "Stories", "Contact"];

const glass: React.CSSProperties = {
  backdropFilter: "blur(16px) saturate(1.9) brightness(1.08)",
  WebkitBackdropFilter: "blur(16px) saturate(1.9) brightness(1.08)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.38), rgba(255,255,255,0.1))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(255,255,255,0.18), inset 1px 0 0 rgba(255,255,255,0.3), 0 14px 34px -8px rgba(17,51,47,0.35)",
};

function GlassBar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState("Journeys");
  const x = useMotionValue(0);
  const lensX = useSpring(x, { stiffness: 220, damping: 22 });

  return (
    <nav
      aria-label="Demo primary"
      className="relative mx-auto flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-1 overflow-hidden rounded-full p-1.5"
      style={glass}
      onPointerMove={(e) => x.set(e.clientX - e.currentTarget.getBoundingClientRect().left - 44)}
      onPointerLeave={() => setHovered(null)}
    >
      <motion.span
        aria-hidden
        style={{ x: lensX, backdropFilter: "blur(2px) brightness(1.25) saturate(1.5)", WebkitBackdropFilter: "blur(2px) brightness(1.25) saturate(1.5)" }}
        className="pointer-events-none absolute -top-2 left-0 h-[calc(100%+16px)] w-[88px] rounded-full bg-white/20 shadow-[inset_0_0_14px_rgba(255,255,255,0.55)]"
      />
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-glass-deep font-sora text-sm font-semibold text-glass-sand">T</span>
      {links.map((link) => (
        <button
          key={link}
          type="button"
          onClick={() => setActive(link)}
          onPointerEnter={() => setHovered(link)}
          onFocus={() => setHovered(link)}
          onBlur={() => setHovered(null)}
          aria-current={active === link ? "page" : undefined}
          className="relative rounded-full px-3 py-2 font-sora text-[13px] font-medium text-glass-deep sm:px-4"
        >
          {(hovered ? hovered === link : active === link) && (
            <motion.span layoutId="glass-pill" className="absolute inset-0 rounded-full bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
          )}
          <span className="relative">{link}</span>
        </button>
      ))}
    </nav>
  );
}

export default function LiquidGlassNav() {
  return (
    <div className="px-3 pb-16 pt-36 font-sora sm:px-6">
      <DemoFrame url="tidewater.example/journeys">
        <div className="relative min-h-[1500px] overflow-hidden bg-glass-sand text-glass-deep">
          <div aria-hidden className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-glass-coral" />
          <div aria-hidden className="absolute right-[-60px] top-[360px] h-[420px] w-[420px] rounded-full bg-glass-teal" />
          <div aria-hidden className="absolute left-[20%] top-[860px] h-80 w-[520px] rotate-12 rounded-[999px] bg-glass-coral/90" />
          <div aria-hidden className="absolute right-[10%] top-[1180px] h-72 w-72 rounded-full bg-glass-deep" />

          <div className="sticky top-4 z-20 px-2 pt-4"><GlassBar /></div>

          <header className="relative z-10 px-6 pb-24 pt-24 sm:px-14">
            <h1 className="max-w-xl text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1] tracking-[-0.04em]">Slow travel by the water.</h1>
            <p className="mt-5 max-w-sm leading-relaxed">Small-boat journeys along the Dalmatian coast, booked by the week and paced by the tide.</p>
          </header>
          <section className="relative z-10 ml-auto max-w-md px-6 pb-48 pt-24 text-white sm:mr-14">
            <h2 className="text-3xl font-semibold tracking-tight">Scroll to watch the bar bend the scenery.</h2>
            <p className="mt-4 leading-relaxed text-white/85">The glass blurs and brightens whatever passes behind it, so the shapes below shift as you move.</p>
          </section>
          <section className="relative z-10 px-6 pb-40 sm:px-14">
            <h2 className="max-w-md text-3xl font-semibold tracking-tight">Eight berths, one captain, no schedule.</h2>
          </section>
        </div>
      </DemoFrame>
      <p className="mx-auto mt-5 max-w-6xl text-sm text-home-mute">Hover the bar to see the lens follow your cursor, then scroll the page inside the frame.</p>
    </div>
  );
}
