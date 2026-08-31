'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Utility to split text for letter-by-letter animation without paid plugins
const SplitText = ({ children, className }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {children.split('').map((char, i) => (
        <span key={i} className="inline-block char-element will-change-transform" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default function Philosophy() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgGlow1 = useRef(null);
  const bgGlow2 = useRef(null);
  const breatheTextRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      // Background Gradient Mesh Animation (Mood, not distraction)
      gsap.to(bgGlow1.current, {
        xPercent: 50, yPercent: 30, rotation: 360,
        duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(bgGlow2.current, {
        xPercent: -50, yPercent: -30, rotation: -360,
        duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }

    // DESKTOP: Horizontal Scroll-Jack Manifesto
    mm.add("(min-width: 768px)", () => {
      
      // 1. The Horizontal Track Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4x height for a long, controlled scroll
          pin: true,
          scrub: 1.2, // Smooth scrubbing
        }
      });

      // Move track left by 2 viewport widths (to show all 3 chapters)
      tl.to(trackRef.current, { xPercent: -66.666, ease: "none" });

      // 2. Chapter 1: Kinetic Letter Reveal (Snappy in, soft settle)
      gsap.fromTo('.char-element', 
        { y: 150, rotateX: -90, opacity: 0 },
        { 
          y: 0, rotateX: 0, opacity: 1, 
          stagger: 0.02, 
          duration: 1.5, 
          ease: "expo.out", // Snappy in, soft settle
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

      // 3. Chapter 2: Scattered Stagger (Asymmetry)
      const chap2Words = gsap.utils.toArray('.chap2-word');
      gsap.fromTo(chap2Words,
        { opacity: 0, x: 100, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.3,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // Trigger when pinned
            end: "+=100%", // Trigger during the first part of scrub
            scrub: 1,
          }
        }
      );

      // 4. Chapter 3: Breathing Text
      if (!prefersReduced) {
        gsap.to(breatheTextRef.current, {
          scale: 1.05,
          color: "#D4AF37",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    // MOBILE: Vertical Stacking (Graceful simplification)
    mm.add("(max-width: 767px)", () => {
      const chapters = gsap.utils.toArray('.mobile-chapter');
      chapters.forEach((chap) => {
        gsap.fromTo(chap, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: chap, start: "top 80%" }
          }
        );
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full md:h-screen bg-[#030303] text-[#F9F9F7] overflow-hidden z-20">
      
      {/* Generative Background: Ambient Gradient Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden mix-blend-screen">
        <div ref={bgGlow1} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/10 blur-[120px]"></div>
        <div ref={bgGlow2} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#ffffff]/5 blur-[120px]"></div>
      </div>

      {/* DESKTOP: Horizontal Track */}
      <div ref={trackRef} className="hidden md:flex h-full w-[300vw] relative z-10 will-change-transform">
        
        {/* Chapter 1: The Hook (Kinetic Type Reveal) */}
        <div className="w-screen h-full flex flex-col justify-center px-16 lg:px-32">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-8">Manifesto . 01</p>
          <h2 className="text-[10vw] font-serif leading-[0.85] uppercase tracking-tighter">
            <SplitText>WE REJECT</SplitText><br/>
            <SplitText className="italic text-white/50">THE ORDINARY.</SplitText>
          </h2>
        </div>

        {/* Chapter 2: The Process (Asymmetry & Negative Space) */}
        <div className="w-screen h-full relative px-16 lg:px-32">
          <p className="absolute top-1/4 left-16 font-mono text-xs tracking-[0.4em] uppercase text-[#D4AF37]">Manifesto . 02</p>
          
          <h2 className="chap2-word absolute top-[30%] left-[20%] text-[7vw] font-serif uppercase leading-none">
            We Sculpt
          </h2>
          <h2 className="chap2-word absolute top-[50%] right-[30%] text-[7vw] font-serif uppercase leading-none italic text-white/50">
            Tension
          </h2>
          <h2 className="chap2-word absolute bottom-[20%] right-16 lg:right-32 text-[7vw] font-serif uppercase leading-none">
            & Light.
          </h2>
        </div>

        {/* Chapter 3: The Result (Breathing Text Climax) */}
        <div className="w-screen h-full flex flex-col items-center justify-center text-center px-16 lg:px-32">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-12">Manifesto . 03</p>
          <h2 className="text-[4vw] font-serif uppercase leading-[1.1] tracking-tight">
            And dictate the precise<br/>
            <span ref={breatheTextRef} className="inline-block italic mt-4 text-[7vw] font-light">psychological weight</span><br/>
            of every room.
          </h2>
        </div>

      </div>

      {/* MOBILE: Vertical Stack (Graceful Fallback) */}
      <div className="md:hidden w-full flex flex-col py-32 px-6 gap-32 relative z-10">
        <div className="mobile-chapter">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Manifesto . 01</p>
          <h2 className="text-5xl font-serif leading-none uppercase tracking-tighter">
            We Reject<br/><span className="italic text-white/50">The Ordinary.</span>
          </h2>
        </div>

        <div className="mobile-chapter text-right">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Manifesto . 02</p>
          <h2 className="text-5xl font-serif leading-none uppercase tracking-tighter">
            We Sculpt<br/><span className="italic text-white/50">Tension</span><br/>& Light.
          </h2>
        </div>

        <div className="mobile-chapter text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Manifesto . 03</p>
          <h2 className="text-3xl font-serif uppercase leading-tight tracking-tight">
            And dictate the precise<br/>
            <span className="italic text-[#D4AF37] text-4xl">psychological weight</span><br/>
            of every room.
          </h2>
        </div>
      </div>

    </section>
  );
}