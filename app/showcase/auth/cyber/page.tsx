import type { Metadata } from "next";
import { firaCode } from "@/lib/fonts/authCyber";
import CyberAuth from "@/components/samples/auth/CyberAuth";

export const metadata: Metadata = { title: "Cyber Auth" };

export default function Page() {
  return (
    <div className={firaCode.variable}>
      <CyberAuth />
    </div>
  );
}
