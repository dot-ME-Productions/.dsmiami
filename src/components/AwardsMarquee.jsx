'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AwardsMarquee() {
  const marqueeRef = useRef(null);

  useGSAP(() => {
    // Infinite buttery smooth horizontal scroll
    gsap.to(".marquee-content", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <section ref={marqueeRef} className="w-full py-12 md:py-24 bg-[#050505] text-[#D4AF37] overflow-hidden flex flex-col justify-center border-t border-white/5 relative z-10">
      
      <div className="w-full px-8 md:px-16 mb-8 flex items-end gap-4">
        <h2 className="font-serif text-xl md:text-3xl font-bold tracking-[0.2em] uppercase text-white">
          AWARDS
        </h2>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-50 text-white mb-1">
          Recognition & Accolades
        </p>
      </div>

      <div className="flex w-[200vw] text-4xl md:text-6xl font-serif uppercase tracking-widest whitespace-nowrap">
        <div className="marquee-content flex gap-12 px-6">
          <span>ARCHITECTURAL DIGEST AD100</span>
          <span className="opacity-30">•</span>
          <span>AIA MIAMI WINNER</span>
          <span className="opacity-30">•</span>
          <span>ELLE DECOR A-LIST</span>
          <span className="opacity-30">•</span>
          <span>DEZEEN SHORTLISTED</span>
          <span className="opacity-30">•</span>
          <span>LUXE RED AWARDS</span>
          <span className="opacity-30">•</span>
          <span>WORLD ARCHITECTURE FESTIVAL</span>
          <span className="opacity-30">•</span>
        </div>
        {/* Duplicate for seamless looping */}
        <div className="marquee-content flex gap-12 px-6">
          <span>ARCHITECTURAL DIGEST AD100</span>
          <span className="opacity-30">•</span>
          <span>AIA MIAMI WINNER</span>
          <span className="opacity-30">•</span>
          <span>ELLE DECOR A-LIST</span>
          <span className="opacity-30">•</span>
          <span>DEZEEN SHORTLISTED</span>
          <span className="opacity-30">•</span>
          <span>LUXE RED AWARDS</span>
          <span className="opacity-30">•</span>
          <span>WORLD ARCHITECTURE FESTIVAL</span>
          <span className="opacity-30">•</span>
        </div>
      </div>
    </section>
  );
}