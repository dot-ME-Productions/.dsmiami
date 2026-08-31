'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const maskRef = useRef(null);
  const bgImageRef = useRef(null);

  useGSAP(() => {
    // Awwwards-tier Infinite Zoom Mask Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // 5 screens of scrolling for a massive, slow cinematic effect
        pin: true,
        scrub: 1,
      }
    });

    // 1. "We reject the ordinary"
    tl.to(text1Ref.current, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
      .to(text1Ref.current, { opacity: 0, scale: 1.1, duration: 1, ease: "power2.in" })
      
    // 2. "We sculpt volume"
      .to(text2Ref.current, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
      .to(text2Ref.current, { opacity: 0, scale: 1.1, duration: 1, ease: "power2.in" })
      
    // 3. The Infinite Mask Zoom Reveal
      .to(maskRef.current, { opacity: 1, duration: 0.5 }) // Flash the white mask on
      .to(maskRef.current, { 
        scale: 250, 
        duration: 5, 
        ease: "power4.in",
        transformOrigin: "center center"
      }, "+=0.2") // Wait a beat, then accelerate the infinite zoom
      .to(bgImageRef.current, { 
        scale: 1, 
        duration: 5, 
        ease: "power2.out" 
      }, "<"); // While zooming through the text, pull the image back to normal scale

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      
      {/* 
        Background Image 
        Starts scaled up (1.5x) so we can pull it out cinematically as we zoom through the text
      */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop" 
          alt="Atmosphere" 
          fill 
          priority
          className="object-cover scale-[1.5]"
        />
        {/* Slight gradient overlay so the image isn't too bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* 
        The Blend Mode Mask (MIND-BLOWING EFFECT)
        White background stays white. Black text becomes transparent (window to the image).
      */}
      <div 
        ref={maskRef} 
        className="absolute inset-0 z-10 bg-white flex items-center justify-center opacity-0 pointer-events-none will-change-transform"
        style={{ mixBlendMode: 'screen' }}
      >
        <h2 className="text-[#000000] font-serif text-[18vw] leading-none uppercase tracking-tighter whitespace-nowrap text-center drop-shadow-2xl">
          ATMO<span className="tracking-[0.1em]">S</span>PHERE
        </h2>
      </div>

      {/* Standard Text Statements */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        <h2 
          ref={text1Ref} 
          className="text-4xl md:text-7xl lg:text-[6vw] font-serif uppercase text-[#F9F9F7] opacity-0 scale-95 absolute"
        >
          We reject the ordinary.
        </h2>
        <h2 
          ref={text2Ref} 
          className="text-4xl md:text-7xl lg:text-[6vw] font-serif uppercase text-[#F9F9F7] opacity-0 scale-95 absolute"
        >
          We sculpt volume.
        </h2>
      </div>

    </section>
  );
}