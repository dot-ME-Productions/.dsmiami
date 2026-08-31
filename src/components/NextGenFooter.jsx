'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function NextGenFooter() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(contentRef.current, 
      { yPercent: -50, scale: 0.9 },
      {
        yPercent: 0, scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    // Insane Magnetic Button Physics
    const btn = buttonRef.current;
    const txt = textRef.current;
    if(!btn || !txt) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull button towards mouse
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
      // Pull text inside button EVEN MORE for massive parallax depth
      gsap.to(txt, { x: x * 0.15, y: y * 0.15, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => { 
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); 
      gsap.to(txt, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); 
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => { btn.removeEventListener("mousemove", handleMouseMove); btn.removeEventListener("mouseleave", handleMouseLeave); }
  }, []);

  return (
    <footer ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end z-0 bg-[#0C0F12]">
      
      <div ref={contentRef} className="w-full h-full flex flex-col justify-between p-8 md:p-16">
        
        <div className="flex justify-between items-start mt-32">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-4xl md:text-6xl uppercase tracking-widest text-[#C5A880]">
              COMMISSION A PROJECT
            </h3>
            <a href="mailto:hello@designsolutions.com" className="font-mono text-sm tracking-[0.2em] text-white hover:text-[#C5A880] transition-colors">
              hello@designsolutions.com
            </a>
            <a href="tel:+17862244923" className="font-mono text-sm tracking-[0.2em] text-white hover:text-[#C5A880] transition-colors">
              +1 786 224 4923
            </a>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs tracking-widest uppercase text-right text-white/50">
            <p>Miami</p>
            
          </div>
        </div>

        <div className="w-full flex justify-center my-12">
          <Link href="/contact" ref={buttonRef} className="group relative inline-flex items-center justify-center px-24 py-12 border border-[#C5A880] rounded-full overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[#C5A880] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            <span ref={textRef} className="relative z-10 font-serif text-3xl tracking-[0.2em] text-[#C5A880] group-hover:text-[#0C0F12] uppercase transition-colors duration-500 pointer-events-none">
              INITIATE
            </span>
          </Link>
        </div>

        <div className="w-full text-center">
          <h1 className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter uppercase whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700 text-white">
            DS MIAMI
          </h1>
        </div>

      </div>
    </footer>
  );
}