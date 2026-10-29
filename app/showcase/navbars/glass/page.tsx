import type { Metadata } from "next";
import { sora } from "@/lib/fonts/glass";
import LiquidGlassNav from "@/components/samples/navbars/LiquidGlassNav";

export const metadata: Metadata = { title: "Liquid Glass Navbar" };

export default function Page() {
  return (
    <div className={sora.variable}>
      <LiquidGlassNav />
    </div>
  );
}
