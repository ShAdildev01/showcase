import type { Metadata } from "next";
import { chakra, jbMono } from "@/lib/fonts/cyber";
import CyberSite from "@/components/samples/cyber/CyberSite";

export const metadata: Metadata = { title: "Cybersecurity Website" };

export default function Page() {
  return (
    <div className={`${chakra.variable} ${jbMono.variable}`}>
      <CyberSite />
    </div>
  );
}
