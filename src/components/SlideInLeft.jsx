import { useEffect, useRef, useState } from "react";

function SlideInLeft({ children, distance = 80 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out
        ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[80px]"}
      `}
    >
      {children}
    </div>
  );
};
export default SlideInLeft;