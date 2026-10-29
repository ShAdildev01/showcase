import Link from "next/link";
import { featured } from "@/data/showcase";

const offsets = ["sm:mt-0", "sm:mt-14", "sm:mt-6", "sm:mt-20"];
const widths = ["sm:w-[380px]", "sm:w-[300px]", "sm:w-[420px]", "sm:w-[320px]"];

export default function FeaturedStrip() {
  return (
    <section aria-labelledby="featured-title" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="featured-title" className="max-w-md font-fraunces text-3xl font-light leading-tight tracking-tight sm:text-4xl">
            Four to start with
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-home-mute">
            A taste of the range. The full set of twelve sits behind the menu in the gallery.
          </p>
        </div>

        <ul className="no-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0">
          {featured.map((sample, i) => (
            <li key={sample.href} className={`w-[76vw] shrink-0 snap-start ${widths[i]} ${offsets[i]}`}>
              <Link href={sample.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] ring-1 ring-white/10" style={{ background: sample.palette[0] }}>
                  <div
                    className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full transition-transform duration-700 ease-out group-hover:scale-125"
                    style={{ background: sample.palette[2] }}
                  />
                  <div
                    className="absolute left-6 top-6 h-24 w-24 rounded-[10px] transition-transform duration-700 ease-out group-hover:-rotate-6"
                    style={{ background: sample.palette[1] }}
                  />
                  <div className="absolute inset-x-6 bottom-6 flex gap-1.5">
                    {sample.palette.map((c) => (
                      <span key={c} className="h-2 w-8 rounded-full ring-1 ring-black/15" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <h3 className="mt-4 font-fraunces text-xl tracking-tight">{sample.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-home-mute">{sample.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
