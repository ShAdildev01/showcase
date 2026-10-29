import type { Metadata } from "next";
import { dmSans, syne } from "@/lib/fonts/orbit";
import OrbitSite from "@/components/samples/orbit/OrbitSite";

export const metadata: Metadata = { title: "3D Website" };

export default function Page() {
  return (
    <div className={`${syne.variable} ${dmSans.variable}`}>
      <OrbitSite />
    </div>
  );
}
