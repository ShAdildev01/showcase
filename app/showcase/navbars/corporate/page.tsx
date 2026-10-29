import type { Metadata } from "next";
import { sourceSans, sourceSerif } from "@/lib/fonts/corporate";
import CorporateNav from "@/components/samples/navbars/CorporateNav";

export const metadata: Metadata = { title: "Corporate Navbar" };

export default function Page() {
  return (
    <div className={`${sourceSerif.variable} ${sourceSans.variable}`}>
      <CorporateNav />
    </div>
  );
}
