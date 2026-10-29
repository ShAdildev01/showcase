type Props = { variant: number; tone: string; accent: string };

export default function Elevation({ variant, tone, accent }: Props) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Line elevation drawing of the building">
      <rect width="400" height="300" fill={tone} />
      <line x1="0" y1="236" x2="400" y2="236" stroke={accent} strokeWidth="1.5" />
      {variant === 0 && (
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <path d="M40 236V150L200 96l160 54v86" />
          <path d="M40 150h320" />
          <rect x="230" y="170" width="90" height="66" fill={accent} fillOpacity="0.14" />
          <path d="M90 236v-44h60v44M90 214h60" />
        </g>
      )}
      {variant === 1 && (
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <rect x="60" y="90" width="280" height="146" />
          <path d="M60 90l30-28h220l30 28" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={82 + i * 36} y="112" width="20" height="50" fill={accent} fillOpacity="0.14" />
          ))}
          <path d="M170 236v-52h60v52" fill={accent} fillOpacity="0.14" />
        </g>
      )}
      {variant === 2 && (
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <path d="M50 236v-40h70v-40h70v-40h70v-40h60v160" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={70 + i * 70} y={206 - i * 40} width="30" height="20" fill={accent} fillOpacity="0.14" />
          ))}
        </g>
      )}
      {variant === 3 && (
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <path d="M70 236V140l50-44v44l50-44v44l50-44v44l60-44v140" />
          <path d="M70 140h220" />
          <rect x="120" y="168" width="90" height="68" fill={accent} fillOpacity="0.14" />
        </g>
      )}
    </svg>
  );
}
