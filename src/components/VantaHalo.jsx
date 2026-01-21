import { useEffect, useRef } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";

export default function VantaHalo({ className = "", children }) {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const roRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // กัน canvas ค้าง/ซ้อน
    el.querySelectorAll(".vanta-canvas").forEach((c) => c.remove());

    // สร้าง effect
    effectRef.current = HALO({
      el,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      baseColor: 0x2b3869,
      backgroundColor: 0x000000,
      amplitudeFactor: 0.4,
      size: 2.0,
    });

    // ✅ บังคับ resize หลังวาด 1 เฟรม (แก้อ่านขนาดเป็น 0)
    requestAnimationFrame(() => effectRef.current?.resize?.());

    // ✅ resize ตามขนาด container จริง (กันตอน font/load/layout เปลี่ยน)
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
      style={{ height: "100vh", width: "100%" }} // ✅ ชัวร์สุดว่าเต็มจอ
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
