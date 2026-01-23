import { useEffect, useMemo, useRef, useState } from "react";

export default function CustomCursor({
  // ปกติ / hover / click
  src = "/acursor.png",
  hoverSrc = "/acursor-hover.png",
  clickSrc = "/acursor-click.png",

  // ตอนสกอล
  scrollUpSrc = "/acursor-scroll-up.png",
  scrollDownSrc = "/acursor-scroll-down.png",

  size = 60,
  ringSize = 44,
  ringBorder = 2,
  ringSmoothing = 0.12,


    scrollUpSize = 90,      // 👈 ขนาดตอนสกอลขึ้น (ปีนบันได)
  scrollDownSize = 70,  

  // หลังหยุดสกอลกี่ ms ให้กลับรูปปกติ
  scrollResetMs = 180,
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  // "up" | "down" | null
  const [scrollDir, setScrollDir] = useState(null);
  const scrollTimer = useRef(null);

  // เลือกรูปตาม priority: click > scroll > hover > normal
  const currentSrc = useMemo(() => {
    if (down) return clickSrc || src;
    if (scrollDir === "down") return scrollDownSrc || src;
    if (scrollDir === "up") return scrollUpSrc || src;
    if (hover) return hoverSrc || src;
    return src;
  }, [down, scrollDir, hover, src, hoverSrc, clickSrc, scrollUpSrc, scrollDownSrc]);
 const currentSize = useMemo(() => {
  if (scrollDir === "up") return scrollUpSize;
  if (scrollDir === "down") return scrollDownSize;
  return size;
}, [scrollDir, size, scrollUpSize, scrollDownSize]);


  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e) => {
      if (e.target.closest("a, button, [data-cursor='hover']")) setHover(true);
      else setHover(false);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    // ✅ wheel: บอกทิศทางสกอลได้แม่น (trackpad ก็ได้)
    const onWheel = (e) => {
      const dir = e.deltaY > 0 ? "down" : "up";
      setScrollDir(dir);

      // reset timer ให้กลับเป็นปกติหลังหยุดสกอล
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrollDir(null), scrollResetMs);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("wheel", onWheel);

      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [scrollResetMs]);

  // วงกลมตามหลังแบบหน่วง
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * ringSmoothing,
        y: prev.y + (pos.y - prev.y) * ringSmoothing,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos.x, pos.y, ringSmoothing]);

  return (
    <>
      {/* วงกลมตามหลัง */}
      <div
        className={`
          pointer-events-none fixed z-[9998] rounded-full
          transition-[transform,opacity] duration-150 ease-out
          ${hover ? "opacity-90 scale-110" : "opacity-60 scale-100"}
          ${down ? "scale-90" : ""}
        `}
        style={{
          left: ringPos.x,
          top: ringPos.y,
          width: ringSize,
          height: ringSize,
          border: `${ringBorder}px solid rgba(255,255,255,0.65)`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 18px rgba(255,255,255,0.18)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* รูป cursor */}
    <img
  src={currentSrc}
  alt="custom cursor"
  className={`
    pointer-events-none fixed z-[9999]
    transition-[transform,width,height] duration-150 ease-out
    ${hover ? "scale-110 rotate-6" : "scale-100"}
    ${down ? "scale-95 rotate-0" : ""}
  `}
  style={{
    left: pos.x,
    top: pos.y,
    width: currentSize,   // ✅ ใช้ขนาดใหม่
    height: currentSize,
    transform: "translate(-50%, -50%)",
    userSelect: "none",
  }}
  draggable={false}
/>
    </>
  );
}
