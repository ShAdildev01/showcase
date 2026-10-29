export default function ShieldMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" aria-hidden="true">
      <path d="M60 6 108 24v40c0 36-20 60-48 72C32 124 12 100 12 64V24L60 6Z" stroke="#2CF5CF" strokeWidth="1.5" fill="rgba(44,245,207,0.05)" />
      <path d="M60 20 96 33v31c0 28-15 47-36 57-21-10-36-29-36-57V33l36-13Z" stroke="#14323A" strokeWidth="1" />
      <path d="M42 70l12 12 26-28" stroke="#2CF5CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
