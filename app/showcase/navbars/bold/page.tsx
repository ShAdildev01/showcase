import type { Metadata } from "next";
import { archivo, bigShoulders } from "@/lib/fonts/bold";
import BoldNav from "@/components/samples/navbars/BoldNav";

export const metadata: Metadata = { title: "Premium Bold Navbar" };

export default function Page() {
  return (
    <div className={`${bigShoulders.variable} ${archivo.variable}`}>
      <BoldNav />
    </div>
  );
}
