import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export function Meteors({ number = 20, className }) {
  const dots = useMemo(() => {
    return Array.from({ length: number }).map(() => {
      const top = Math.random() * 100;           // ตำแหน่งแนวตั้ง (%)
      const delay = Math.random() * 2;
      const duration = 6 + Math.random() * 4;
      const size = 1.5 + Math.random() * 6;
      const opacity = 0.4 + Math.random() * 0.6;

      return { top, delay, duration, size, opacity };
    });
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="meteor-dot"
          style={{
            top: `${d.top}%`,
            ["--delay"]: `${d.delay}s`,
            ["--duration"]: `${d.duration}s`,
            ["--size"]: `${d.size}px`,
            ["--opacity"]: d.opacity,
          }}
        />
      ))}
    </div>
  );
}
