"use client";

import { useEffect, useState } from "react";
import { terminalScript } from "@/data/cyber";

export default function Terminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= terminalScript.length) {
      const reset = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, 4200);
      return () => clearTimeout(reset);
    }
    const line = terminalScript[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), line.startsWith("$") ? 38 : 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 420);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const done = terminalScript.slice(0, lineIndex);
  const typing = lineIndex < terminalScript.length;
  const current = typing ? terminalScript[lineIndex].slice(0, charIndex) : "";

  return (
    <div className="overflow-hidden rounded-xl border border-cyber-line bg-cyber-panel/90 font-jbmono text-[13px] shadow-[0_0_60px_-20px_rgba(44,245,207,0.35)]">
      <div className="flex items-center gap-2 border-b border-cyber-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-cyber-alert" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5C84C]" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyber-neon" />
        <span className="ml-3 text-xs text-cyber-mute">kestrel@ops: ~/engagements</span>
      </div>
      <div className="min-h-[250px] space-y-1.5 p-5 leading-relaxed" aria-hidden>
        {done.map((l, i) => (
          <p key={i} className={l.startsWith("$") ? "text-cyber-neon" : l.startsWith("found") || l.startsWith("chain") ? "text-cyber-alert" : "text-cyber-mute"}>
            {l}
          </p>
        ))}
        {typing && (
          <p className={terminalScript[lineIndex].startsWith("$") ? "text-cyber-neon" : "text-cyber-text"}>
            {current}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyber-neon" />
          </p>
        )}
      </div>
    </div>
  );
}
