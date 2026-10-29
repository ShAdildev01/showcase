"use client";

import { useEffect, useState } from "react";

export type Point = { t: number; [key: string]: number };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function seed(length: number, keys: string[], base: number[]): Point[] {
  return Array.from({ length }, (_, i) => {
    const point: Point = { t: i };
    keys.forEach((key, k) => {
      point[key] = Math.round(clamp(base[k] + Math.sin(i / (3 + k)) * 9 + Math.cos(i / 2) * 4, 2, 98));
    });
    return point;
  });
}

export function useLiveSeries(keys: string[], base: number[], length = 40, intervalMs = 1500) {
  const [data, setData] = useState<Point[]>(() => seed(length, keys, base));

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const next: Point = { t: last.t + 1 };
        keys.forEach((key) => {
          next[key] = Math.round(clamp(last[key] + (Math.random() - 0.5) * 14, 4, 96));
        });
        return [...prev.slice(1), next];
      });
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs]);

  return data;
}
