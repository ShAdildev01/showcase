import type { Metadata } from "next";
import { manrope, unbounded } from "@/lib/fonts/authModern";
import ModernAuth from "@/components/samples/auth/ModernAuth";

export const metadata: Metadata = { title: "Modern Auth" };

export default function Page() {
  return (
    <div className={`${unbounded.variable} ${manrope.variable}`}>
      <ModernAuth />
    </div>
  );
}
