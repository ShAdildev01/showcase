import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ShowcaseMenu from "@/components/showcase/ShowcaseMenu";
import { groups } from "@/data/showcase";

export const metadata: Metadata = { title: "Showcase" };

export default function ShowcasePage() {
  return (
    <div className="px-5 pb-28 pt-36 sm:px-8">
      <ShowcaseMenu />
      <div className="mx-auto max-w-7xl">
        <header className="mb-20 grid gap-6 lg:grid-cols-12">
          <h1 className="font-fraunces text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em] lg:col-span-8">
            Four kinds of interface, three takes on each.
          </h1>
          <p className="max-w-sm text-[15px] leading-relaxed text-home-mute lg:col-span-3 lg:col-start-10 lg:self-end">
            Open the menu at the top left to jump anywhere, or read down the index. Every sample is a real route.
          </p>
        </header>

        <div className="space-y-20">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-title`} className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <h2 id={`${group.id}-title`} className="font-fraunces text-2xl tracking-tight">{group.title}</h2>
                <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-home-mute">{group.note}</p>
              </div>
              <ul className="divide-y divide-home-line border-y border-home-line lg:col-span-9">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group grid items-center gap-3 py-6 transition-[padding] duration-500 ease-out hover:pl-3 sm:grid-cols-[1fr_auto] sm:gap-8"
                    >
                      <div>
                        <h3 className="text-xl tracking-tight">{item.title}</h3>
                        <p className="mt-1 max-w-lg text-sm leading-relaxed text-home-mute">{item.blurb}</p>
                        <p className="mt-2 text-xs text-home-mute/70">{item.type}</p>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="flex">
                          {item.palette.map((c) => (
                            <span key={c} className="-ml-1.5 h-6 w-6 rounded-full ring-2 ring-home-bg first:ml-0" style={{ background: c }} />
                          ))}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-home-mute transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-home-accent" strokeWidth={1.6} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
