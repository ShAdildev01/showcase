"use client";

import { motion } from "framer-motion";
import { landmasses, sources, target } from "@/data/security";

const project = (lon: number, lat: number) => ({ x: lon + 180, y: 90 - lat });
const toPath = (pts: number[]) => {
  const pairs: string[] = [];
  for (let i = 0; i < pts.length; i += 2) {
    const { x, y } = project(pts[i], pts[i + 1]);
    pairs.push(`${i === 0 ? "M" : "L"}${x} ${y}`);
  }
  return `${pairs.join(" ")}Z`;
};

const severityColor = { crit: "#FF3B47", high: "#FF8A1F", med: "#F5D547", low: "#44D19A" } as const;

export default function ThreatMap() {
  const dest = project(target.lon, target.lat);

  return (
    <svg viewBox="0 0 360 180" className="h-full w-full" role="img" aria-label="Map of live attack origins targeting the Frankfurt site">
      <defs>
        <pattern id="dots" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.6" fill="#2A3644" />
        </pattern>
      </defs>
      {[-60, -30, 0, 30, 60].map((lat) => (
        <line key={lat} x1="0" x2="360" y1={90 - lat} y2={90 - lat} stroke="#141B24" strokeWidth="0.4" />
      ))}
      {landmasses.map((pts, i) => (
        <path key={i} d={toPath(pts)} fill="url(#dots)" stroke="#1C242E" strokeWidth="0.5" />
      ))}

      {sources.map((s, i) => {
        const from = project(s.lon, s.lat);
        const mx = (from.x + dest.x) / 2;
        const my = Math.min(from.y, dest.y) - 24;
        const color = severityColor[s.severity];
        return (
          <g key={s.name}>
            <motion.path
              d={`M${from.x} ${from.y} Q${mx} ${my} ${dest.x} ${dest.y}`}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
            />
            <circle cx={from.x} cy={from.y} r="1.6" fill={color} />
            <circle cx={from.x} cy={from.y} r="1.6" fill="none" stroke={color} strokeWidth="0.6">
              <animate attributeName="r" values="1.6;6" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          </g>
        );
      })}

      <rect x={dest.x - 2.5} y={dest.y - 2.5} width="5" height="5" fill="#4AA8FF" />
      <circle cx={dest.x} cy={dest.y} r="7" fill="none" stroke="#4AA8FF" strokeWidth="0.5" />
    </svg>
  );
}
