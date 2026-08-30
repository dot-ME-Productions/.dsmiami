'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScroll({ children }) {
  const progressRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', (e) => {
      // Global progress bar math
      if(progressRef.current) {
        gsap.set(progressRef.current, { scaleX: e.progress });
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Provide lenis instance globally for scroll-to functions if needed
    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div 
        ref={progressRef}
        className="fixed top-0 left-0 w-full h-[3px] bg-[#D4AF37] z-[9999] origin-left pointer-events-none mix-blend-difference"
        style={{ scaleX: 0 }}
      ></div>
      {children}
    </>
  );
}