import type { Metadata } from "next";
import { barlow, barlowC, jbMono } from "@/lib/fonts/security";
import SecurityDashboard from "@/components/samples/security/SecurityDashboard";

export const metadata: Metadata = { title: "Security Dashboard" };

export default function Page() {
  return (
    <div className={`${barlowC.variable} ${barlow.variable} ${jbMono.variable}`}>
      <SecurityDashboard />
    </div>
  );
}
