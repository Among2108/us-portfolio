import { useEffect, useRef, useState } from "react";

export default function SlideInRight({
  children,
  distance = 80,
  threshold = 0.2,
  duration = 1200,
  delay = 0,
  easing = "ease-out",
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateX(0px)" : `translateX(${distance}px)`,
        transitionProperty: "transform, opacity",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: easing,
      }}
    >
      {children}
    </div>
  );
}
