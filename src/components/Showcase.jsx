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
    let mm = gsap.matchMedia();
    
    // Only apply horizontal pinning on Desktop (Task 4)
    mm.add("(min-width: 768px)", () => {
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

      // Image inner parallax and scale
      panels.forEach((panel) => {
        const img = panel.querySelector('.proj-img');
        gsap.to(img, {
          scale: 0.8,
          xPercent: 20, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: true,
          }
        });
      });
    });

    // Mobile specific animations (Task 7 Visual Polish)
    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray('.showcase-panel');
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            start: "top 80%"
          }
        });
      });
    });

  }, { scope: containerRef });

  const skipDown = () => {
    if(window.lenis) {
      window.lenis.scrollTo('#philosophy-target', { offset: 0, duration: 1.5 });
    } else {
      document.getElementById('philosophy-target')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipUp = () => {
    if(window.lenis) {
      window.lenis.scrollTo('#hero-target', { offset: 0, duration: 1.5 });
    } else {
      document.getElementById('hero-target')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative md:h-screen w-full bg-[#050505] text-[#F9F9F7] md:overflow-hidden flex items-center py-20 md:py-0">
      
      {/* Massive Background Watermark (Task 2: Main Brand Title h1) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[30vw] font-serif opacity-[0.15] whitespace-nowrap tracking-tighter">
          DS MIAMI
        </h1>
      </div>

      <div ref={scrollWrapperRef} className="flex flex-col md:flex-row md:h-full w-full md:w-[400vw] relative z-10 gap-20 md:gap-0">
        {projects.map((proj, i) => (
          <div key={proj.id} className="showcase-panel w-full md:w-screen md:h-full flex flex-col justify-center items-center relative px-4 md:px-20">
            <div className="cursor-explore w-full max-w-5xl aspect-[4/5] md:aspect-[21/9] relative overflow-hidden group rounded-sm md:rounded-none">
              <img src={proj.img} alt={proj.title} className="proj-img w-full h-full object-cover transform md:scale-110 opacity-100 transition-all duration-700" />
            </div>
            
            <div className="relative mt-6 md:mt-0 md:absolute md:bottom-32 md:left-32 z-20 w-full text-center md:text-left">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#D4AF37] mb-2">0{proj.id} &#8212; PROJECT</p>
              {/* Task 2: Project names as h2 */}
              <h2 className="text-3xl md:text-7xl font-serif uppercase tracking-widest text-white drop-shadow-2xl">{proj.title}</h2>
              <p className="font-light text-white/70 max-w-md mt-4 mx-auto md:mx-0">{proj.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip Navigation Interface - Hidden on Mobile since it's vertical now */}
      <div className="hidden md:flex absolute bottom-8 left-0 w-full justify-center items-center gap-8 z-50 pointer-events-auto">
        <button 
          onClick={skipUp}
          aria-label="Skip up to Hero section"
          className="font-mono text-[10px] tracking-[0.3em] text-white/50 hover:text-white uppercase transition-colors"
        >
          &#8593; Skip to Hero
        </button>
        <button 
          onClick={skipDown}
          aria-label="Skip down to Philosophy section"
          className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] hover:text-white uppercase transition-colors"
        >
          Skip Showcase &#8595;
        </button>
      </div>
    </section>
  );
}