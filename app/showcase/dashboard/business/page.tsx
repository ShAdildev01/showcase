import type { Metadata } from "next";
import { bricolage, publicSans } from "@/lib/fonts/business";
import BusinessDashboard from "@/components/samples/business/BusinessDashboard";

export const metadata: Metadata = { title: "Business Dashboard" };

export default function Page() {
  return (
    <div className={`${bricolage.variable} ${publicSans.variable}`}>
      <BusinessDashboard />
    </div>
  );
}
