'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'THE GLASS HOUSE', subtitle: 'Where light is treated as the primary architectural material.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop' },
  { id: 2, title: 'OBSIDIAN VILLA', subtitle: 'A brutalist monolith carved into the Miami coastline.', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop' },
  { id: 3, title: 'CASA DEL SOL', subtitle: 'Redefining tropical modernism through organic textures.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop' },
  { id: 4, title: 'LUMINA ESTATE', subtitle: 'Turnkey perfection down to the finest micro-detail.', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2874&auto=format&fit=crop' },
];

export default function Showcase() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.showcase-panel');
    const totalWidth = scrollWrapperRef.current.offsetWidth - window.innerWidth;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + totalWidth,
      }
    });

    // Image inner parallax and massive scale on scroll
    panels.forEach((panel) => {
      const img = panel.querySelector('.proj-img');
      gsap.to(img, {
        scale: 0.8,
        xPercent: 20, // push it right as you scroll left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + totalWidth,
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  const skipDown = () => {
    const target = document.getElementById('philosophy-target');
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const skipUp = () => {
    const target = document.getElementById('hero-target');
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] text-[#F9F9F7] overflow-hidden flex items-center">
      
      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[30vw] font-serif opacity-[0.15] whitespace-nowrap tracking-tighter">
          DS MIAMI
        </h1>
      </div>

      <div ref={scrollWrapperRef} className="flex h-full w-[400vw] relative z-10">
        {projects.map((proj, i) => (
          <div key={proj.id} className="showcase-panel w-screen h-full flex flex-col justify-center items-center relative px-4 md:px-20">
            <div className="w-full max-w-5xl aspect-video md:aspect-[21/9] relative overflow-hidden group">
              <img src={proj.img} alt={proj.title} className="proj-img w-full h-full object-cover transform scale-110 opacity-100 transition-all duration-700" />
            </div>
            
            <div className="absolute bottom-20 md:bottom-32 left-8 md:left-32 z-20">
              <p className="font-mono text-xs tracking-widest text-[#D4AF37] mb-2">0{proj.id} — PROJECT</p>
              <h2 className="text-4xl md:text-7xl font-serif uppercase tracking-widest text-white drop-shadow-2xl">{proj.title}</h2>
              <p className="font-light text-white/70 max-w-md mt-4">{proj.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip Navigation Interface */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-8 z-50 pointer-events-auto">
        <button 
          onClick={skipUp}
          className="font-mono text-[10px] tracking-[0.3em] text-white/50 hover:text-white uppercase transition-colors"
        >
          ↑ Skip to Hero
        </button>
        <button 
          onClick={skipDown}
          className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] hover:text-white uppercase transition-colors"
        >
          Skip Showcase ↓
        </button>
      </div>
    </section>
  );
}