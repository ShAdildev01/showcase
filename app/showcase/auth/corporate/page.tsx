import type { Metadata } from "next";
import { franklin, spectral } from "@/lib/fonts/authCorporate";
import CorporateAuth from "@/components/samples/auth/CorporateAuth";

export const metadata: Metadata = { title: "Corporate Auth" };

export default function Page() {
  return (
    <div className={`${franklin.variable} ${spectral.variable}`}>
      <CorporateAuth />
    </div>
  );
}
