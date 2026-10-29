"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToShowcase() {
  const pathname = usePathname();
  if (pathname === "/showcase") return null;

  return (
    <Link
      href="/showcase"
      className="group fixed left-3 top-[76px] z-40 inline-flex items-center gap-2 rounded-full bg-home-bg/90 py-2 pl-3 pr-4 text-sm text-home-text ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-home-raised sm:left-6"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" strokeWidth={1.75} />
      Back to Showcase
    </Link>
  );
}
