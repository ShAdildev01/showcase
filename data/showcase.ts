export type Sample = {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  type: string;
  palette: string[];
};

export type SampleGroup = {
  id: string;
  title: string;
  note: string;
  items: Sample[];
};

export const groups: SampleGroup[] = [
  {
    id: "sites",
    title: "Sites",
    note: "Three full landing pages, three different moods.",
    items: [
      { slug: "3d", href: "/showcase/sites/3d", title: "3D Website", blurb: "A studio site built around a WebGL sculpture that follows your pointer.", type: "Syne + DM Sans", palette: ["#D9D4C8", "#1A1815", "#E2541B"] },
      { slug: "cyber", href: "/showcase/sites/cyber", title: "Cybersecurity Website", blurb: "A red-team firm that talks to you in a terminal.", type: "Chakra Petch + JetBrains Mono", palette: ["#04080A", "#2CF5CF", "#FF3E7F"] },
      { slug: "modern", href: "/showcase/sites/modern", title: "Modern Website", blurb: "An architecture practice, quiet and bright, with a project index that previews on hover.", type: "Instrument Serif + Figtree", palette: ["#FAF9F5", "#2D5B47", "#F1E4A8"] },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    note: "Dense, live and legible at a glance.",
    items: [
      { slug: "system", href: "/showcase/dashboard/system", title: "Powerful System Dashboard", blurb: "Cores, memory, network and processes streaming in real time.", type: "IBM Plex Sans + Mono", palette: ["#E4E4DF", "#15171A", "#E8501E"] },
      { slug: "security", href: "/showcase/dashboard/security", title: "Dark Security Dashboard", blurb: "Threat map, severity-ranked alerts and a live log tail.", type: "Barlow Condensed + Barlow", palette: ["#080A0D", "#FF3B47", "#FF8A1F"] },
      { slug: "business", href: "/showcase/dashboard/business", title: "Business Dashboard", blurb: "Revenue, KPIs and an account table you can filter and sort.", type: "Bricolage Grotesque + Public Sans", palette: ["#F4F2EC", "#0E5A47", "#D2962B"] },
    ],
  },
  {
    id: "navbars",
    title: "Navbars",
    note: "Each one lives on a demo page so you can judge it in context.",
    items: [
      { slug: "glass", href: "/showcase/navbars/glass", title: "Liquid Glass Navbar", blurb: "Refractive blur with a lens that chases the cursor.", type: "Sora", palette: ["#F2E6D3", "#F26B4E", "#0F8F86"] },
      { slug: "corporate", href: "/showcase/navbars/corporate", title: "Corporate Navbar", blurb: "A utility bar, a measured main bar and a keyboard-friendly mega-menu.", type: "Source Serif 4 + Source Sans 3", palette: ["#11243E", "#B58B3C", "#F6F7F9"] },
      { slug: "bold", href: "/showcase/navbars/bold", title: "Premium Bold Navbar", blurb: "An oversized wordmark that shrinks, and a curtain menu.", type: "Big Shoulders Display + Archivo", palette: ["#ECE6D6", "#0E0E0E", "#E8321E"] },
    ],
  },
  {
    id: "auth",
    title: "Auth Pages",
    note: "Login and sign-up with validation, password reveal and social sign-in.",
    items: [
      { slug: "modern", href: "/showcase/auth/modern", title: "Modern Auth", blurb: "A loud split layout with a strength meter that reacts as you type.", type: "Unbounded + Manrope", palette: ["#FF5B1F", "#FFF2E1", "#0F3B2E"] },
      { slug: "corporate", href: "/showcase/auth/corporate", title: "Corporate Auth", blurb: "Calm, minimal and explicit about security.", type: "Libre Franklin + Spectral", palette: ["#F5F6F4", "#1F4E5F", "#1B2430"] },
      { slug: "cyber", href: "/showcase/auth/cyber", title: "Cyber Auth", blurb: "A terminal session with glowing inputs and printed errors.", type: "Fira Code", palette: ["#030805", "#6BFF7A", "#FF5C5C"] },
    ],
  },
];

export const featuredHrefs = [
  "/showcase/sites/3d",
  "/showcase/dashboard/security",
  "/showcase/navbars/glass",
  "/showcase/auth/cyber",
];

export const allSamples = groups.flatMap((g) => g.items);
export const featured = featuredHrefs
  .map((href) => allSamples.find((s) => s.href === href))
  .filter((s): s is Sample => Boolean(s));
