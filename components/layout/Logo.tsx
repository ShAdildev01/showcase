export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden="true">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10" y="10" width="16" height="16" rx="3" fill="#EBA43A" />
      <path d="M14 18.5h8M14 21.5h5" stroke="#0A1411" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
