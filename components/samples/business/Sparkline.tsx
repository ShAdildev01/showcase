export default function Sparkline({ points, color }: { points: readonly number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = 100 / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${i * step} ${30 - ((p - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-24" preserveAspectRatio="none" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
