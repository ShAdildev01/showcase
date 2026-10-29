"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const layers = [
  { color: "#ECE8DF", label: "Surface", z: 0 },
  { color: "#1A1815", label: "Frame", z: 36 },
  { color: "#E2541B", label: "Signal", z: 72 },
];

export default function TiltStack() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [16, -16]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-20, 20]), { stiffness: 120, damping: 14 });

  const onMove = (e: React.PointerEvent) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    px.set((e.clientX - box.left) / box.width - 0.5);
    py.set((e.clientY - box.top) / box.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="grid place-items-center py-10 [perspective:900px]"
      aria-label="Layered plates that tilt with your pointer"
      role="img"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-60 w-60 sm:h-72 sm:w-72">
        {layers.map((l, i) => (
          <div
            key={l.label}
            className="absolute inset-0 grid place-items-end rounded-3xl p-4 text-sm shadow-[0_30px_50px_-20px_rgba(26,24,21,0.45)]"
            style={{ background: l.color, transform: `translateZ(${l.z}px) scale(${1 - i * 0.14})`, color: i === 0 ? "#1A1815" : "#ECE8DF" }}
          >
            {l.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
