'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const spotlightRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current, 
      { yPercent: 30, opacity: 0 }, 
      { 
        yPercent: 0, 
        opacity: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const moveSpotlight = (e) => {
      if (!spotlightRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(spotlightRef.current, {
        x: x - 400, // center the 800px circle
        y: y - 400,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveSpotlight);
    return () => window.removeEventListener("mousemove", moveSpotlight);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full bg-[#0C0F12] overflow-hidden flex items-center justify-center border-t border-white/10 cursor-none">
      
      {/* Hidden Architectural Blueprint Layer - Made brighter */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: 'url("https://ds-miami.com/wp-content/uploads/2026/05/optimized_modern_kitchen_livingroom-scaled.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'invert(1)'
      }}></div>

      {/* The Ambient Darkness + Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none z-10 hidden md:block"
        style={{
          // Spotlight is much bigger (800px) and the global darkness is reduced to 0.75
          background: 'radial-gradient(circle, rgba(5,5,5,0) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.85) 100%)',
          boxShadow: '0 0 0 9999px rgba(5,5,5,0.85)'
        }}
      ></div>
      {/* Mobile fallback */}
      <div className="absolute inset-0 bg-[#0C0F12]/80 md:hidden z-10 pointer-events-none"></div>

      {/* Profound Typography */}
      <div ref={textRef} className="relative z-20 w-[80vw] md:w-[60vw] text-center mix-blend-difference pointer-events-none">
        <h2 className="text-[6vw] md:text-[4vw] font-serif leading-[1.1] text-[#F9F9F7] tracking-tight">
          We do not decorate spaces. <br/>
          <span className="italic text-[#C5A880]">We architect emotional resonance.</span>
        </h2>
        <p className="mt-8 text-xs md:text-sm tracking-[0.2em] uppercase font-mono opacity-50 text-[#F9F9F7]">
          The Philosophy behind 400+ Masterpieces
        </p>
      </div>

    </section>
  );
}