"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/showcase", label: "Showcase" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out",
        scrolled ? "border-b border-white/5 bg-home-bg/55 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        <Link
          href="/"
          aria-label="Showcase, home"
          className="flex items-center gap-2.5 rounded-full bg-home-bg/85 py-2 pl-2.5 pr-3 text-home-text ring-1 ring-white/10 backdrop-blur-md sm:pr-4"
        >
          <Logo className="h-6 w-6" />
          <span className="hidden font-fraunces text-[17px] leading-none tracking-tight sm:block">Showcase</span>
        </Link>

        <nav aria-label="Primary" className="rounded-full bg-home-bg/85 p-1 ring-1 ring-white/10 backdrop-blur-md">
          <ul className="flex items-center">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 sm:px-4 sm:text-sm",
                      active ? "text-home-bg" : "text-home-mute hover:text-home-text"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-home-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
