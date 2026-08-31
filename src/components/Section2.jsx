'use client';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Venetian Islands", category: "Architecture", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop" },
  { title: "Architectural Digest", category: "Featured Publication", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop", isAward: true },
  { title: "Ponce Davis", category: "Turnkey Interior", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop" },
  { title: "Forbes & Elle Decor", category: "International Recognition", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop", isAward: true }
];

export default function Section2() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    const scrollWidth = scrollWrapperRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    // Horizontal Scroll
    gsap.to(scrollWrapperRef.current, {
      x: -(scrollWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        refreshPriority: 0
      }
    });

    // Fade out title so it doesn't overlap
    gsap.to(titleRef.current, {
      opacity: 0,
      y: -50,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300",
        scrub: true
      }
    });

    // Inner Image Parallax (Clean)
    const images = gsap.utils.toArray('.proj-img');
    images.forEach(img => {
      gsap.to(img, {
        xPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          refreshPriority: 0
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="awards" ref={containerRef} className="h-screen bg-[#050505] text-[#F9F9F7] flex flex-col justify-center border-t border-white/10 relative overflow-hidden cursor-none pt-12">
      
      <div ref={titleRef} className="absolute top-8 md:top-16 left-8 md:left-16 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-serif">Selected <span className="italic text-[#D4AF37]">Archive</span></h2>
        <p className="text-xs tracking-[0.3em] uppercase mt-4 opacity-50">400+ Turnkey Projects</p>
      </div>

      <div ref={scrollWrapperRef} className="flex gap-8 md:gap-16 px-8 md:px-[20vw] items-center h-[60vh] md:h-[70vh] w-[max-content] mt-24">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="relative h-[80%] md:h-[90%] flex-shrink-0 group flex flex-col justify-end transform-gpu" 
            style={{ width: proj.isAward ? '40vw' : '60vw' }}
          >
            
            {proj.isAward && (
              <div className="absolute -top-12 md:-top-16 left-0 z-30 w-[150%] pointer-events-none">
                <h3 className="text-[8vw] md:text-[6vw] font-serif text-[#D4AF37] opacity-80 leading-none drop-shadow-2xl">{proj.title}</h3>
              </div>
            )}

            <div className="w-full h-full overflow-hidden relative border border-[#F9F9F7]/10 group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]">
              <Image src={proj.img} alt={proj.title} fill className="object-cover proj-img w-[120%] h-full object-cover -left-[10%] relative opacity-60 group-hover:opacity-100 transition-all duration-1000 ease-out" />
              <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors duration-1000"></div>
            </div>

            <div className="absolute bottom-6 left-0 flex justify-between w-full text-xs tracking-widest uppercase font-mono px-6 pointer-events-none">
              <span className="opacity-60 text-[#F9F9F7]">{proj.category}</span>
              <span className="text-[#D4AF37] font-bold">{!proj.isAward && proj.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}