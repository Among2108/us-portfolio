import { useEffect, useRef } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function VantaClouds({ className = "", children }) {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const roRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // กัน canvas ค้าง/ซ้อน
    el.querySelectorAll(".vanta-canvas").forEach((c) => c.remove());

    // สร้าง effect
    effectRef.current = CLOUDS({
      el,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      speed: 0.6, // ✅ เท่ากับของ script เดิม
      // ปรับเพิ่มได้ เช่น:
      // cloudColor: 0x334155,
      // skyColor: 0x0b1220,
      // sunColor: 0xffcc66,
      // sunGlareColor: 0xffdd99,
      // sunlightColor: 0xffffff,
    });

    // ✅ บังคับ resize หลังวาด 1 เฟรม
    requestAnimationFrame(() => effectRef.current?.resize?.());

    // ✅ resize ตามขนาด container จริง
    roRef.current = new ResizeObserver(() => {
      effectRef.current?.resize?.();
    });
    roRef.current.observe(el);

    return () => {
      roRef.current?.disconnect();
      roRef.current = null;

      effectRef.current?.destroy();
      effectRef.current = null;

      el.querySelectorAll(".vanta-canvas").forEach((c) => c.remove());
    };
  }, []);

  return (
   <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
