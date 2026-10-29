import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "About" };

const principles = [
  { title: "One identity per page", text: "Palette, type pairing and layout are chosen for the subject, then kept separate from every other sample." },
  { title: "Motion that answers you", text: "Things move when you act: opening a panel, hovering a row, submitting a form. Not before." },
  { title: "Data that looks real", text: "Dashboards run on believable numbers, so density and hierarchy can be judged honestly." },
];

export default function AboutPage() {
  return (
    <>
      <div className="px-5 pb-24 pt-36 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
          <h1 className="font-fraunces text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em] lg:col-span-7">
            Interface design, shown by doing it twelve ways.
          </h1>
          <div className="space-y-6 text-[17px] leading-relaxed text-home-mute lg:col-span-4 lg:col-start-9">
            <p>
              Showcase is a portfolio built as a gallery of working pages. Instead of screenshots, each piece is a route you can click through, resize and break.
            </p>
            <p>It is built with Next.js, Tailwind CSS, Framer Motion, Recharts and three.js, with all data mocked locally.</p>
          </div>
        </div>

        <dl className="mx-auto mt-24 grid max-w-7xl gap-10 border-t border-home-line pt-10 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title}>
              <dt className="font-fraunces text-xl tracking-tight">{p.title}</dt>
              <dd className="mt-2 max-w-xs text-sm leading-relaxed text-home-mute">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Footer />
    </>
  );
}
