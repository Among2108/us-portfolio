import { useEffect, useRef, useState } from "react";

export default function ScrollTimelineIndicator({
  targetRef,
  height = 460,
  topOffset = 96,
  startLabel = "2024",
  endLabel = "2025",

  // หน่วงเล็กน้อย (ยิ่งน้อยยิ่งหน่วง)
  smoothing = 0.14,

  // วงกลมหมุนกี่รอบตลอดเส้น (1 = 360°, 2 = 720°)
  rotateTurns = 2,
}) {
  const [progress, setProgress] = useState(0); // smooth value 0..1
  const targetP = useRef(0); // raw target 0..1
  const rafId = useRef(null);

  const clamp = (v) => Math.max(0, Math.min(1, v));

  // Smooth follow (หน่วงนิดๆ)
  const animate = () => {
    setProgress((prev) => prev + (targetP.current - prev) * smoothing);
    rafId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // คำนวณ raw progress จาก scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = targetRef?.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;

      if (scrollable <= 0) {
        targetP.current = rect.top <= 0 ? 1 : 0;
        return;
      }

      targetP.current = clamp(-rect.top / scrollable);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetRef]);

  // ---- derived styles ----
  const top = `calc(${progress * 100}% - 16px)`; // -16 เพราะวงกลม 32px
  const rotateDeg = progress * 360 * rotateTurns;

  return (
    <div className="sticky" style={{ top: topOffset }}>
      <div className="relative w-[120px]" style={{ height }}>
        {/* YEAR TOP */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-semibold text-white">
          {startLabel}
        </div>

        {/* BASE LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[15px] -translate-x-1/2 rounded-full bg-white/20" />

        {/* PROGRESS LINE (gradient) */}
        <div
          className="absolute left-1/2 top-0 w-[15px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300 via-fuchsia-300 to-amber-200"
          style={{ height: `${progress * 100}%` }}
        />

        {/* MOVING CIRCLE + RINGS */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top }}
        >
          <div className="relative">
            {/* ring: ping ripple */}
            <div className="absolute inset-0 rounded-full ring-2 ring-white/35 animate-ping" />

            {/* ring: soft outer ring (คงที่) */}
            <div className="absolute -inset-2 rounded-full ring-2 ring-white/15" />

            {/* main circle (rotate) */}
            <div
              className="h-8 w-8 rounded-full bg-white border-[5px] border-neutral-900 shadow-lg"
              style={{ transform: `rotate(${rotateDeg}deg)` }}
            >
              {/* เพิ่ม “ขีดเล็ก” บนวงกลมให้เห็นว่ามันหมุนจริง */}
              <div className="absolute left-1/2 top-[2px] -translate-x-1/2 h-2 w-[3px] rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>

        {/* YEAR BOTTOM */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-2xl font-semibold text-white">
          {endLabel}
        </div>
      </div>
    </div>
  );
}
