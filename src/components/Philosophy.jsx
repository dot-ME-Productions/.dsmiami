'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);

  useGSAP(() => {
    // The "Highlight Reading" scrub effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Statement 1 illuminates, then dims
    tl.to(s1Ref.current, { color: "#050505", opacity: 1, duration: 1 })
      .to(s1Ref.current, { color: "rgba(5, 5, 5, 0.15)", opacity: 1, duration: 0.5 })
    // Statement 2 illuminates, then dims
      .to(s2Ref.current, { color: "#050505", opacity: 1, duration: 1 })
      .to(s2Ref.current, { color: "rgba(5, 5, 5, 0.15)", opacity: 1, duration: 0.5 })
    // Statement 3 illuminates and stays
      .to(s3Ref.current, { color: "#050505", opacity: 1, duration: 1.5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-[#F9F9F7] rounded-t-[5vw] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Sticky Text Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-16 text-center">
        
        <p className="font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#050505] mb-16 border-b border-[#050505] pb-4">
          The Manifesto
        </p>
        
        <div className="flex flex-col gap-6 md:gap-10 items-center justify-center w-full max-w-7xl">
            <h2 ref={s1Ref} className="text-4xl md:text-[6vw] font-serif uppercase leading-none text-[#050505] opacity-20 transition-colors">
              We Reject The Ordinary.
            </h2>

            <h2 ref={s2Ref} className="text-4xl md:text-[6vw] font-serif uppercase leading-none text-[#050505] opacity-20 transition-colors">
              We Sculpt Volume & Light.
            </h2>

            <h2 ref={s3Ref} className="text-3xl md:text-[5vw] font-serif uppercase leading-[1.1] text-[#050505] opacity-20 transition-colors mt-8">
              And dictate the precise <br/>
              <span className="italic font-light">psychological weight</span> <br/>
              of every room.
            </h2>
        </div>

      </div>
      
    </section>
  );
}