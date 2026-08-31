'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Principal() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".principal-img", 
      { scale: 1.2, filter: "grayscale(1) brightness(0.5)" }, 
      { scale: 1, filter: "grayscale(0) brightness(1)", ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "center center", scrub: true } }
    );
    gsap.fromTo(".principal-text", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 60%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-[#F9F9F7] py-32 md:py-48 px-6 md:px-16 overflow-hidden relative z-20 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">
        
        {/* The Architect Profile Video Teaser (DeepSeek Upgrade 5) */}
        <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop" 
            alt="Luciana Fragali - Principal Architect" 
            fill 
            className="principal-img object-cover group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 bg-black/30 backdrop-blur-sm">
             <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-md">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-transparent border-l-white ml-1"></div>
             </div>
          </div>

          <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
             <p className="font-serif text-3xl md:text-5xl uppercase tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-500">Luciana Fragali</p>
             <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2">Watch Principal Film [1:00]</p>
          </div>
        </div>

        {/* The Intel / Bio */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="principal-text font-mono text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-8">The Mind Behind The Atmosphere</p>
          
          <h2 className="principal-text text-3xl md:text-5xl font-serif uppercase tracking-tight leading-tight mb-12">
            "We don't do cookie-cutter.<br/> We design for legacy."
          </h2>

          <div className="principal-text space-y-8 font-light text-white/70 text-sm md:text-lg leading-relaxed max-w-xl">
            <p>
              With over 20 years of experience shaping the architectural skyline of Miami, Luciana Fragali has built a reputation on rejecting the expected. Across more than 400 bespoke luxury projects, her approach remains ruthlessly dedicated to the psychology of space.
            </p>
            <p>
              Drawing heavy inspiration from European travelâ€”particularly the coastal light of Capriâ€”Luciana engineers environments that feel both globally informed and intimately rooted. Her daily meditation practice serves as the foundation for her design philosophy: a clear mind produces absolute, uncompromising spaces.
            </p>
          </div>
          
          <div className="principal-text mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 max-w-xl">
            <div>
              <p className="text-4xl md:text-6xl font-serif text-[#D4AF37]">20+</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mt-2">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-serif text-[#D4AF37]">400+</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mt-2">Projects Delivered</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}