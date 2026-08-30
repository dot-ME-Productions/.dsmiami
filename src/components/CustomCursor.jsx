'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Extremely snappy, 1-to-1 feel matching top-tier portfolios
    let xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    let yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.closest('.proj-img')) {
        gsap.to(cursor, { 
          width: 80, 
          height: 80, 
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.5)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(text, { opacity: 1, duration: 0.2 });
      }
      else if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
        gsap.to(cursor, { 
          width: 50, 
          height: 50, 
          backgroundColor: "transparent",
          backdropFilter: "none",
          border: "1px solid #F9F9F7", 
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      }
      else {
        // Small sharp dot
        gsap.to(cursor, { 
          width: 14, 
          height: 14, 
          backgroundColor: "#F9F9F7",
          backdropFilter: "none",
          border: "none",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [pathname]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-[14px] h-[14px] bg-[#F9F9F7] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      style={{ willChange: 'transform, width, height' }}
    >
      <span ref={textRef} className="opacity-0 font-mono text-[8px] tracking-widest uppercase text-[#F9F9F7] font-bold">
        View
      </span>
    </div>
  );
}