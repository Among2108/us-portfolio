import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  distance = 120,   // ระยะเลื่อนขึ้นทั้งหมด (px)
  fadeRange = 300,  // ระยะ scroll ที่ใช้ในการโผล่
}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    opacity: 0,
    transform: `translateY(${distance}px)`,
  });

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // คำนวณ progress (0 → 1)
      const progress = Math.min(
        Math.max((vh - rect.top) / fadeRange, 0),
        1
      );

      setStyle({
        opacity: progress,
        transform: `translateY(${(1 - progress) * distance}px)`,
      });
    };

    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance, fadeRange]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
