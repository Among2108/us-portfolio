import { useEffect, useRef } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";

export default function VantaBirds({ className = "", children }) {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const roRef = useRef(null);
  const initOnceRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    const cleanup = () => {
      roRef.current?.disconnect();
      roRef.current = null;

      effectRef.current?.destroy?.();
      effectRef.current = null;

      el.querySelectorAll(".vanta-canvas").forEach((c) => c.remove());
      initOnceRef.current = false;
    };

    // ✅ กัน StrictMode/init ซ้อน
    if (initOnceRef.current) {
      cleanup();
    }
    initOnceRef.current = true;

    // กัน canvas ค้าง/ซ้อนก่อนสร้างใหม่
    el.querySelectorAll(".vanta-canvas").forEach((c) => c.remove());

    // ✅ สร้างหลัง 1 เฟรม (กัน layout/size ยังเป็น 0)
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;

      effectRef.current = BIRDS({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,

        backgroundColor: 0x000000,

        // ค่อยๆ ใส่ config เพิ่มทีหลังได้
        color1: 0xff0000,
        color2: 0x00d1ff,
        quantity: 5,
        birdSize: 1,
        wingSpan: 30,
        speedLimit: 5,
        separation: 20,
        alignment: 20,
        cohesion: 20,

        avoidEdges: true,
      });

      // resize หลัง init
      requestAnimationFrame(() => effectRef.current?.resize?.());

      // resize ตาม container
      roRef.current = new ResizeObserver(() => {
        effectRef.current?.resize?.();
      });
      roRef.current.observe(el);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
