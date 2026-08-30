'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const overlayRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // When the route changes, sweep the curtain UP to reveal the new page
    window.scrollTo(0, 0);

    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, 
        { yPercent: 0 }, 
        { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }
      );
    }
  }, [pathname]);

  return (
    <>
      {/* Route Change Curtain (Black Overlay) */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-[#050505] z-[9999] pointer-events-none"
        style={{ yPercent: 0 }}
      ></div>
      {children}
    </>
  );
}