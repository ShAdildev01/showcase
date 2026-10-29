"use client";

import { useEffect, useState } from "react";
import { logTemplates } from "@/data/security";

type Line = { id: number; time: string; text: string };

const pad = (n: number) => n.toString().padStart(2, "0");
const stamp = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const tone = (text: string) => (/^(DROP|BLOCK)/.test(text) ? "text-sec-high" : /^AUTH/.test(text) ? "text-sec-crit" : "text-sec-mute");

export default function LogTail() {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    let id = 0;
    const push = () => {
      const text = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLines((prev) => [...prev.slice(-11), { id: id++, time: stamp(new Date()), text }]);
    };
    push();
    const timer = setInterval(push, 1100);
    return () => clearInterval(timer);
  }, []);

  return (
    <ul className="space-y-1.5 font-jbmono text-[11.5px] leading-snug" aria-label="Live firewall log">
      {lines.map((l) => (
        <li key={l.id} className={`flex gap-3 ${tone(l.text)}`}>
          <span className="shrink-0 text-sec-mute/60">{l.time}</span>
          <span className="break-all">{l.text}</span>
        </li>
      ))}
    </ul>
  );
}
