'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isLoaded = true }) {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const crosshairRef = useRef(null);
  const introTl = useRef(null);

  useGSAP(() => {
    introTl.current = gsap.timeline({ paused: true });
    
    // Intro purely focuses on typography now
    introTl.current.to([textRef1.current, textRef2.current], { autoAlpha: 1, duration: 0 }) 
      .fromTo(textRef1.current, { yPercent: 120 }, { yPercent: 0, duration: 1.5, ease: "power4.out" })
      .fromTo(textRef2.current, { yPercent: 120 }, { yPercent: 0, duration: 1.5, ease: "power4.out" }, "-=1.2");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        refreshPriority: 1
      }
    });

    // Image is entirely bound to the scroll wheel now.
    // At the absolute top, it is 100% invisible. Scrolling down fades and warps it in.
    scrollTl.to(imageWrapperRef.current, { autoAlpha: 1, duration: 0 }, 0); // make it visible to GSAP engine
    scrollTl.fromTo(imageWrapperRef.current, {
      clipPath: "inset(40% 45% 40% 45%)",
      opacity: 0,
      scale: 0.8
    }, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      scale: 1,
      ease: "power2.inOut",
      immediateRender: false
    }, 0);

    scrollTl.fromTo(imageRef.current, {
      scale: 1.5,
      yPercent: -10
    }, {
      scale: 1,
      yPercent: 15,
      ease: "power2.inOut",
      immediateRender: false
    }, 0);

    const moveCrosshair = (e) => {
      if(!crosshairRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(crosshairRef.current, { x, y, duration: 1, ease: "power2.out" });
    };
    
    window.addEventListener("mousemove", moveCrosshair);
    return () => window.removeEventListener("mousemove", moveCrosshair);
  }, { scope: sectionRef });

  useEffect(() => {
    if (isLoaded && introTl.current) {
      introTl.current.play();
    }
  }, [isLoaded]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-[#F9F9F7] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. GPU Accelerated Shutter Image (Back Layer) */}
      <div 
        ref={imageWrapperRef} 
        className="absolute inset-0 z-0 w-full h-full overflow-hidden opacity-0 invisible"
      >
        <img 
          ref={imageRef}
          src="/hero-house.webp" 
          alt="Luxury Architecture" 
          className="w-full h-[120%] object-cover object-center -top-[10%] relative brightness-90"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 2. Massive Typography (Restored Mix Blend Difference) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mt-12 md:mt-24 mix-blend-difference">
        <div className="overflow-hidden leading-[0.85] pb-4">
          <h1 ref={textRef1} className="text-[16vw] font-serif text-[#F9F9F7] tracking-tighter uppercase opacity-0 invisible">DESIGN</h1>
        </div>
        <div className="overflow-hidden leading-[0.85] pb-4 -mt-[2vw]">
          <h1 ref={textRef2} className="text-[16vw] font-serif text-[#F9F9F7] italic tracking-tighter uppercase opacity-0 invisible">SOLUTIONS</h1>
        </div>
      </div>

      {/* 3. Architectural UI Elements */}
      <div ref={crosshairRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center mix-blend-difference opacity-40">
        <div className="w-[1px] h-[120vh] bg-[#F9F9F7]"></div>
        <div className="h-[1px] w-[120vw] bg-[#F9F9F7] absolute"></div>
        <div className="absolute w-64 h-64 border border-[#F9F9F7] rounded-full"></div>
      </div>

      <div className="absolute top-32 left-8 md:left-16 z-20 text-[#050505] mix-blend-difference text-[0.55rem] tracking-[0.4em] uppercase opacity-60 font-mono text-[#F9F9F7]">
        <p>LAT 25.7617Ã‚Â° N</p>
        <p>LONG 80.1918Ã‚Â° W</p>
      </div>
      <div className="absolute bottom-12 right-8 md:right-16 z-20 mix-blend-difference text-[0.55rem] tracking-[0.4em] uppercase opacity-60 font-mono text-right text-[#F9F9F7]">
        <p>SCALE 1:100</p>
        <p>ELEVATION +12FT</p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-2 opacity-70 mix-blend-difference text-[#F9F9F7]">
        <span className="text-[0.55rem] uppercase tracking-[0.4em]">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-[#F9F9F7] overflow-hidden opacity-50">
          <div className="w-full h-full bg-[#D4AF37] -translate-y-full animate-scroll-line"></div>
        </div>
      </div>
    </section>
  );
}