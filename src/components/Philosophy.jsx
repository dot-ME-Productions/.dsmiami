'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    // Ultra-clean, premium slow-fade and gentle rise
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1.5,
        }
      }
    );

    // Elegant line extension
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1.5,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-[#050505]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col items-center md:items-start text-center md:text-left">
        <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-[#D4AF37] mb-12">
          The Philosophy
        </p>
        
        <h2 ref={textRef} className="text-3xl md:text-6xl lg:text-[4.5vw] font-serif uppercase tracking-tight leading-[1.15] text-[#F9F9F7] max-w-5xl">
          We do not decorate spaces. We engineer tension, manipulate light, and dictate the precise psychological weight of every room.
        </h2>

        <div ref={lineRef} className="w-full max-w-sm h-[1px] bg-[#D4AF37] mt-16 origin-left"></div>
      </div>

    </section>
  );
}