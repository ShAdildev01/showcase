import type { Metadata, Viewport } from "next";
import { fraunces, hanken } from "@/lib/fonts/home";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Showcase", template: "%s | Showcase" },
  description: "A gallery of sites, dashboards, navigation bars and sign-in pages, each designed with its own identity.",
};

export const viewport: Viewport = {
  themeColor: "#0A1411",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-home-accent px-3 py-2 text-home-bg focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
