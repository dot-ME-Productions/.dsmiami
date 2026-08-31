'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const tensionRef = useRef(null);
  const lightRef = useRef(null);
  const weightRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 90%",
        scrub: 1.5,
      }
    });

    // 1. ENGINEER TENSION (Starts completely squished/tense, expands out)
    tl.fromTo(tensionRef.current, 
      { letterSpacing: "-0.15em", opacity: 0, scale: 0.95 },
      { letterSpacing: "0.02em", opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    // 2. MANIPULATE LIGHT (Text is pitch black, illuminates brilliantly with a golden aura)
    tl.fromTo(lightRef.current, 
      { color: "#0A0A0A", textShadow: "0px 0px 0px rgba(212,175,55,0)" },
      { color: "#F9F9F7", textShadow: "0px 0px 60px rgba(212,175,55,0.8)", duration: 1, ease: "none" }
    );

    // 3. PSYCHOLOGICAL WEIGHT (Starts crushed down under gravity, rises up and breathes)
    tl.fromTo(weightRef.current,
      { y: 150, scaleY: 0.4, opacity: 0, transformOrigin: "bottom" },
      { y: 0, scaleY: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] flex flex-col items-center justify-center bg-[#050505] py-32 overflow-hidden">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 flex flex-col items-center text-center gap-16 md:gap-32">
        
        <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-[#D4AF37] mb-8">
          The Architecture of Emotion
        </p>
        
        <h2 ref={tensionRef} className="text-4xl md:text-7xl lg:text-[7vw] font-serif uppercase leading-none text-[#F9F9F7] whitespace-nowrap">
          We Engineer Tension.
        </h2>

        <h2 ref={lightRef} className="text-4xl md:text-7xl lg:text-[7vw] font-serif uppercase leading-none text-[#0A0A0A] whitespace-nowrap">
          We Manipulate Light.
        </h2>

        <h2 ref={weightRef} className="text-3xl md:text-6xl lg:text-[5vw] font-serif uppercase leading-[1.1] text-[#F9F9F7] max-w-5xl mt-12">
          And dictate the precise <br/>
          <span className="italic text-[#D4AF37]">psychological weight</span> <br/>
          of every room.
        </h2>

      </div>
    </section>
  );
}