import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-home-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-home-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Showcase, a working gallery of interface design. 2026.</p>
        <ul className="flex gap-6">
          <li><Link className="transition-colors hover:text-home-text" href="/showcase">Gallery</Link></li>
          <li><Link className="transition-colors hover:text-home-text" href="/about">About</Link></li>
          <li><Link className="transition-colors hover:text-home-text" href="/contact">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}
