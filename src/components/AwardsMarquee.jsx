'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

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
    <section ref={marqueeRef} className="w-full py-24 md:py-32 bg-[#0C0F12] text-[#C5A880] overflow-hidden flex flex-col justify-center border-t border-white/5 relative z-10">
      
      {/* Background Image of Awards/Trophies */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <Image 
          src="https://ds-miami.com/wp-content/uploads/2026/04/Best-Interior-Design-Companies-1-1200x1368.jpg" 
          alt="DS Miami Awards and Trophies" 
          fill 
          className="object-cover mix-blend-luminosity"
        />
        {/* Gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F12] via-[#0C0F12]/80 to-[#0C0F12]"></div>
      </div>

      <div className="w-full px-8 md:px-16 mb-8 flex flex-col items-center gap-4 relative z-10">
        <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5A880] mb-1">
          Recognition & Accolades
        </p>
      </div>

      <div className="flex w-[200vw] text-4xl md:text-6xl lg:text-8xl font-serif uppercase tracking-widest whitespace-nowrap relative z-10">
        <div className="marquee-content flex gap-12 lg:gap-24 px-6 items-center">
          <span className="text-white mix-blend-difference">ARCHITECTURAL DIGEST AD100</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">AIA MIAMI WINNER</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">ELLE DECOR A-LIST</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">DEZEEN SHORTLISTED</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">LUXE RED AWARDS</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">WORLD ARCHITECTURE FESTIVAL</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
        </div>
        {/* Duplicate for seamless looping */}
        <div className="marquee-content flex gap-12 lg:gap-24 px-6 items-center">
          <span className="text-white mix-blend-difference">ARCHITECTURAL DIGEST AD100</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">AIA MIAMI WINNER</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">ELLE DECOR A-LIST</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">DEZEEN SHORTLISTED</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">LUXE RED AWARDS</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
          <span className="text-white mix-blend-difference">WORLD ARCHITECTURE FESTIVAL</span>
          <span className="opacity-40 text-[#C5A880] mx-4 md:mx-8 text-3xl md:text-5xl">&#10022;</span>
        </div>
      </div>
    </section>
  );
}