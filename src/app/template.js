'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const curtainRef = useRef(null);
  const path = usePathname();

  useEffect(() => {
    // The preloader is z-[9999]. This curtain is z-[5000].
    // On the very first load, this runs underneath the preloader and is invisible.
    // On every subsequent route click, this acts as a beautiful page transition.
    const tl = gsap.timeline();
    
    tl.set(curtainRef.current, { transformOrigin: "top" });
    tl.fromTo(curtainRef.current, 
      { scaleY: 1 }, 
      { scaleY: 0, duration: 1.2, ease: "power4.inOut" }
    );
  }, [path]);

  return (
    <>
      <div 
        ref={curtainRef} 
        className="fixed inset-0 bg-[#050505] z-[5000] pointer-events-none"
      ></div>
      {children}
    </>
  );
}