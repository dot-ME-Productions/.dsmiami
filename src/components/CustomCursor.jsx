'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // QuickTo for zero-latency 1-to-1 tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a project image
      const exploreTarget = e.target.closest('.cursor-explore');
      
      if (exploreTarget) {
        setIsHovering(true);
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: "rgba(249, 249, 247, 1)",
          mixBlendMode: "normal",
          border: "none",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
      } 
      // Normal links/buttons hover
      else if (e.target.closest('a, button, input, .hover-trigger')) {
        setIsHovering(false);
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: "transparent",
          border: "1px solid #F9F9F7",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      } 
      // Default state
      else {
        setIsHovering(false);
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: "#F9F9F7",
          border: "none",
          mixBlendMode: "difference",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="hidden md:flex fixed top-0 left-0 w-3 h-3 bg-[#F9F9F7] rounded-full pointer-events-none z-[999999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden"
    >
      <span ref={textRef} className="text-[10px] font-mono tracking-widest text-[#050505] opacity-0 scale-0 font-bold">
        EXPLORE
      </span>
    </div>
  );
}