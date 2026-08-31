'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

  // Reactive Mouse Trackers
  const reactiveRefs = useRef([]);
  const inverseRefs = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      gsap.to(bgGlow1.current, { xPercent: 50, yPercent: 30, rotation: 360, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(bgGlow2.current, { xPercent: -50, yPercent: -30, rotation: -360, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    mm.add("(min-width: 768px)", () => {
      // Performance Fix: Butter-smooth Cinematic Scale & Fade Entrance
      gsap.fromTo(trackRef.current, 
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "top top", scrub: 1 }}
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.2,
        }
      });

      tl.to(trackRef.current, { xPercent: -66.666, ease: "none" });

      gsap.fromTo('.char-element', 
        { y: 150, rotateX: -90, opacity: 0 },
        { 
          y: 0, rotateX: 0, opacity: 1, stagger: 0.02, duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%", toggleActions: "play none none reverse" }
        }
      );

      const chap2Words = gsap.utils.toArray('.chap2-word');
      gsap.fromTo(chap2Words,
        { opacity: 0, x: 100, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, stagger: 0.3, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=100%", scrub: 1 }
        }
      );

      // DeepSeek Upgrade: Physical Tension & Light Split Animation
      gsap.to('.chap2-tension-left', {
        xPercent: -30, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=200%", scrub: 1 }
      });
      gsap.to('.chap2-tension-right', {
        xPercent: 30, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=200%", scrub: 1 }
      });
      gsap.fromTo('.chap2-light-beam', 
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1.5, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "+=10%", end: "+=80%", scrub: 1 } }
      );

      if (!prefersReduced) {
        gsap.to(breatheTextRef.current, { scale: 1.05, color: "#C5A880", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.mobile-chapter').forEach((chap) => {
        gsap.fromTo(chap, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: chap, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    });

  }, { scope: containerRef });

  // Custom Reactive Mouse Physics
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40; // Max 20px movement
      const y = (clientY / window.innerHeight - 0.5) * 40;

      reactiveRefs.current.forEach(el => {
        if(el) gsap.to(el, { x: x, y: y, duration: 1.2, ease: "power2.out" });
      });
      inverseRefs.current.forEach(el => {
        if(el) gsap.to(el, { x: -x, y: -y, duration: 1.2, ease: "power2.out" });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full md:h-screen bg-[#0A0D10] text-[#F9F9F7] overflow-hidden z-20">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden mix-blend-screen">
        <div ref={bgGlow1} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#C5A880]/10 blur-[120px]"></div>
        <div ref={bgGlow2} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#ffffff]/5 blur-[120px]"></div>
      </div>

      <div ref={trackRef} className="hidden md:flex h-full w-[300vw] relative z-10 will-change-transform">
        
        {/* Chapter 1 */}
        <div className="w-screen h-full flex flex-col justify-center px-10 md:px-20 lg:px-32">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#C5A880] mb-8">Manifesto . 01</p>
          {/* Responsive Typography bounds and Reactive Mouse Triggers */}
          <h2 
            ref={el => reactiveRefs.current[0] = el}
            className="text-[12vw] lg:text-[8vw] xl:text-[7vw] font-serif leading-[0.85] uppercase tracking-tighter"
          >
            <SplitText>WE REJECT</SplitText><br/>
            <SplitText className="italic text-white/50">THE ORDINARY.</SplitText>
          </h2>
        </div>

        {/* Chapter 2 */}
        <div className="w-screen h-full relative px-10 md:px-20 lg:px-32 flex items-center justify-center">
          
          {/* DeepSeek Visual Metaphor: Tension & Light physical split */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
             {/* The underlying blinding light beam - optimized for 60fps but massively amplified */}
             <div className="chap2-light-beam absolute h-[150vh] w-2 bg-white shadow-[0_0_80px_20px_rgba(255,255,255,1)] will-change-transform"></div>
             <div className="chap2-light-beam absolute h-[150vh] w-[40vw] bg-gradient-to-r from-transparent via-white/80 to-transparent will-change-transform blur-md"></div>
             
             {/* The heavy brutalist walls pulling apart in tension - added will-change */}
             <div className="chap2-tension-left absolute top-0 left-0 w-[50.1%] h-full bg-[#0A0D10] border-r border-white/10 z-10 will-change-transform"></div>
             <div className="chap2-tension-right absolute top-0 right-0 w-[50.1%] h-full bg-[#0A0D10] border-l border-white/10 z-10 will-change-transform"></div>
          </div>

          <p className="absolute top-1/4 left-10 md:left-20 lg:left-32 font-mono text-xs tracking-[0.4em] uppercase text-[#C5A880] z-20">Manifesto . 02</p>
          
          <h2 
            ref={el => inverseRefs.current[0] = el}
            className="chap2-word absolute z-20 top-[25%] lg:top-[30%] left-[10%] lg:left-[20%] text-[9vw] lg:text-[6vw] xl:text-[5vw] font-serif uppercase leading-none"
          >
            We Sculpt
          </h2>
          <h2 
            ref={el => reactiveRefs.current[1] = el}
            className="chap2-word absolute z-20 top-[45%] lg:top-[50%] right-[15%] lg:right-[30%] text-[9vw] lg:text-[6vw] xl:text-[5vw] font-serif uppercase leading-none italic text-white/50"
          >
            Tension
          </h2>
          <h2 
            ref={el => inverseRefs.current[1] = el}
            className="chap2-word absolute z-20 bottom-[25%] lg:bottom-[20%] right-10 md:right-20 lg:right-32 text-[9vw] lg:text-[6vw] xl:text-[5vw] font-serif uppercase leading-none"
          >
            & Light.
          </h2>
        </div>

        {/* Chapter 3 */}
        <div className="w-screen h-full flex flex-col items-center justify-center text-center px-10 md:px-20 lg:px-32">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#C5A880] mb-12">Manifesto . 03</p>
          <h2 
            ref={el => reactiveRefs.current[2] = el}
            className="text-[5vw] lg:text-[3vw] xl:text-[2.5vw] font-serif uppercase leading-[1.1] tracking-tight max-w-[90vw]"
          >
            And dictate the precise<br/>
            <span ref={breatheTextRef} className="inline-block italic mt-4 text-[9vw] lg:text-[6vw] xl:text-[5.5vw] font-light">psychological weight</span><br/>
            of every room.
          </h2>
        </div>

      </div>

      {/* MOBILE */}
      <div className="md:hidden w-full flex flex-col py-32 px-6 gap-32 relative z-10">
        <div className="mobile-chapter">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-6">Manifesto . 01</p>
          <h2 className="text-5xl font-serif leading-none uppercase tracking-tighter w-full max-w-full break-words">
            We Reject<br/><span className="italic text-white/50">The Ordinary.</span>
          </h2>
        </div>

        <div className="mobile-chapter text-right">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-6">Manifesto . 02</p>
          <h2 className="text-5xl font-serif leading-none uppercase tracking-tighter">
            We Sculpt<br/><span className="italic text-white/50">Tension</span><br/>& Light.
          </h2>
        </div>

        <div className="mobile-chapter text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-6">Manifesto . 03</p>
          <h2 className="text-3xl font-serif uppercase leading-tight tracking-tight">
            And dictate the precise<br/>
            <span className="italic text-[#C5A880] text-4xl mt-2 block">psychological weight</span>
            of every room.
          </h2>
        </div>
      </div>

    </section>
  );
}