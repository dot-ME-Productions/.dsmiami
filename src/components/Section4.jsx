'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "Turnkey Interior", desc: "End-to-end luxury interiors designed, procured, and installed." },
  { num: "02", title: "Architecture", desc: "Structural and spatial planning that pushes the boundaries of form." },
  { num: "03", title: "Bespoke Furnishing", desc: "Custom pieces sourced globally or fabricated exclusively for your space." }
];

export default function Section4() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    // Elegant stagger entrance for services
    gsap.fromTo(itemsRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen w-full bg-[#F9F9F7] text-[#0C0F12] relative flex flex-col justify-center py-32 px-8 md:px-24 border-t border-[#0C0F12]/10 cursor-none overflow-hidden">
      
      <div className="flex flex-col md:flex-row w-full justify-between items-start mb-24 relative z-10 pointer-events-none">
        <h2 className="text-4xl md:text-7xl font-serif">Our <span className="italic text-[#C5A880]">Services</span></h2>
        <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-50 mt-4 md:mt-0 max-w-sm text-left md:text-right">
          A hyper-focused approach to luxury living.
        </p>
      </div>

      <div className="flex flex-col w-full relative z-10">
        {services.map((s, idx) => (
          <div 
            key={s.num}
            ref={el => itemsRef.current[idx] = el}
            className="border-b border-[#0C0F12]/20 py-8 md:py-16 group relative"
          >
            <div className="absolute inset-0 bg-[#0C0F12] scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:scale-y-100 z-0"></div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-baseline pointer-events-none relative z-10">
              <span className="text-sm font-mono opacity-40 group-hover:opacity-100 group-hover:text-[#C5A880] transition-colors duration-500">{s.num}</span>
              <h3 className="text-4xl md:text-6xl font-serif group-hover:text-[#F9F9F7] transition-colors duration-500">{s.title}</h3>
              <p className="mt-2 md:mt-0 text-sm opacity-60 max-w-md md:ml-auto group-hover:text-[#F9F9F7] group-hover:opacity-80 transition-colors duration-500">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}