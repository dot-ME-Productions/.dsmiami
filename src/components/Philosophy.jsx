'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8, y: 150, rotationX: 45 },
      {
        opacity: 1, scale: 1, y: 0, rotationX: 0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1.5, // Butter scrub
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    // Kinetic Typography Tracking (Mouse dictates rotation/translation slightly)
    const handleMouseMove = (e) => {
      if(!textRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(textRef.current, {
        x: x * 30,
        y: y * 30,
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 1.5,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[140vh] flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
      
      <div className="relative z-10 max-w-[90vw] mx-auto text-center transform-style-3d">
        <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase opacity-40 mb-16">
          The Philosophy
        </p>
        
        <h2 ref={textRef} className="text-5xl md:text-8xl lg:text-[8vw] font-serif uppercase tracking-tighter leading-[0.85] transform-gpu">
          We do not <br/>
          <span className="italic text-[#D4AF37]">decorate spaces.</span> <br/>
          We engineer tension, <br/>
          manipulate light, <br/>
          <span className="opacity-40">& dictate the precise</span> <br/>
          PSYCHOLOGICAL WEIGHT <br/>
          <span className="italic">of every room.</span>
        </h2>
      </div>

    </section>
  );
}