import type { Metadata } from "next";
import { plexMono, plexSans } from "@/lib/fonts/system";
import SystemDashboard from "@/components/samples/system/SystemDashboard";

export const metadata: Metadata = { title: "System Dashboard" };

export default function Page() {
  return (
    <div className={`${plexSans.variable} ${plexMono.variable}`}>
      <SystemDashboard />
    </div>
  );
}
