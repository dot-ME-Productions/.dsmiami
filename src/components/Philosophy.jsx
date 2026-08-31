'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // High-Performance Awwwards Timeline (No blend modes, purely hardware accelerated transforms)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 3 full screens of scrubbing
        pin: true,
        scrub: 1.5,
      }
    });

    // 1. Massive Horizontal Typographic Parallax (Text splits apart)
    tl.to(line1Ref.current, { xPercent: -60, ease: "none" }, 0)
      .to(line2Ref.current, { xPercent: 60, ease: "none" }, 0)
      .to(line3Ref.current, { xPercent: -60, ease: "none" }, 0)
      .to(line4Ref.current, { xPercent: 60, ease: "none" }, 0);

    // 2. Cinematic Iris Reveal (Image starts as a tiny circle, explodes to fill the screen)
    tl.fromTo(imageRef.current,
      { 
        clipPath: "circle(0% at 50% 50%)", 
        scale: 1.5,
        filter: "brightness(0.3) grayscale(1)"
      },
      { 
        clipPath: "circle(150% at 50% 50%)", 
        scale: 1, 
        filter: "brightness(1) grayscale(0)",
        ease: "power2.inOut" 
      }, 
      0 // Runs perfectly parallel with the text splitting
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center z-20">
      
      {/* The Central Iris Image */}
      <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none">
        <div ref={imageRef} className="relative w-full h-full will-change-transform">
          <Image 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop" 
            alt="Interior Architecture" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* The Massive Split Typography */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-[#F9F9F7]">
        
        <div className="w-full flex justify-center overflow-hidden">
          <h2 ref={line1Ref} className="text-[12vw] md:text-[9vw] font-serif uppercase leading-[0.9] tracking-tighter whitespace-nowrap will-change-transform">
            WE REJECT
          </h2>
        </div>

        <div className="w-full flex justify-center overflow-hidden">
          <h2 ref={line2Ref} className="text-[12vw] md:text-[9vw] font-serif uppercase leading-[0.9] tracking-tighter whitespace-nowrap will-change-transform italic text-[#D4AF37]">
            THE ORDINARY.
          </h2>
        </div>

        <div className="w-full flex justify-center overflow-hidden mt-4 md:mt-8">
          <h2 ref={line3Ref} className="text-[12vw] md:text-[9vw] font-serif uppercase leading-[0.9] tracking-tighter whitespace-nowrap will-change-transform">
            WE ENGINEER
          </h2>
        </div>

        <div className="w-full flex justify-center overflow-hidden">
          <h2 ref={line4Ref} className="text-[12vw] md:text-[9vw] font-serif uppercase leading-[0.9] tracking-tighter whitespace-nowrap will-change-transform">
            ATMOSPHERE.
          </h2>
        </div>

      </div>

    </section>
  );
}