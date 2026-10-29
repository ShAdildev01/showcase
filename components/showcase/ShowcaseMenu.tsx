"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { groups } from "@/data/showcase";

export default function ShowcaseMenu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="showcase-panel"
        className="fixed left-3 top-[76px] z-40 inline-flex items-center gap-2.5 rounded-full bg-home-accent py-2 pl-3.5 pr-4 text-sm font-medium text-home-bg transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:left-6"
      >
        <Menu className="h-4 w-4" strokeWidth={2} />
        All samples
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="showcase-panel"
              role="dialog"
              aria-modal="true"
              aria-label="All samples"
              className="fixed inset-y-0 left-0 z-[56] flex w-[min(92vw,420px)] flex-col overflow-y-auto bg-home-raised ring-1 ring-white/10"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-6 pb-4 pt-6">
                <p className="font-fraunces text-2xl tracking-tight">Gallery</p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-9 px-6 pb-10 pt-4" aria-label="Samples">
                {groups.map((group, gi) => (
                  <motion.section
                    key={group.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + gi * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="mb-3 border-b border-home-line pb-2 text-sm font-medium text-home-accent">{group.title}</h2>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5"
                          >
                            <span className="text-[15px]">{item.title}</span>
                            <span className="flex gap-1">
                              {item.palette.map((c) => (
                                <span key={c} className="h-2.5 w-2.5 rounded-full ring-1 ring-white/20" style={{ background: c }} />
                              ))}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
