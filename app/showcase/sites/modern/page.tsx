import type { Metadata } from "next";
import { figtree, instrument } from "@/lib/fonts/halden";
import HaldenSite from "@/components/samples/halden/HaldenSite";

export const metadata: Metadata = { title: "Modern Website" };

export default function Page() {
  return (
    <div className={`${instrument.variable} ${figtree.variable}`}>
      <HaldenSite />
    </div>
  );
}
