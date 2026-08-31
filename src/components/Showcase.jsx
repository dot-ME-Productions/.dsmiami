'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: 'THE GLASS HOUSE', 
    subtitle: 'Where light is treated as the primary architectural material.', 
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
    client: 'Private Tech Executive',
    year: '2025',
    materials: 'Obsidian Glass, Italian Marble, Brushed Bronze',
    desc: 'An ambitious cantilevered structure that floats above the Miami coastline. The entire eastern facade is built from seamless structural glass, allowing the sunrise to physically dictate the internal temperature and mood of the space. We stripped away all internal non-load-bearing walls to create a completely fluid atmospheric experience.'
  },
  { 
    id: 2, 
    title: 'OBSIDIAN VILLA', 
    subtitle: 'A brutalist monolith carved into the Miami coastline.', 
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop',
    client: 'Anonymous Gallery Owner',
    year: '2024',
    materials: 'Board-Formed Concrete, Smoked Oak, Raw Steel',
    desc: 'Designed as a physical fortress for a massive private art collection. The brutalist concrete shell protects the delicate pieces from the Florida sun, while precisely engineered skylights wash the walls in soft, diffuse light. It is less of a home and more of a private museum.'
  },
  { 
    id: 3, 
    title: 'CASA DEL SOL', 
    subtitle: 'Redefining tropical modernism through organic textures.', 
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop',
    client: 'International Athlete',
    year: '2023',
    materials: 'Travertine, Teak, Woven Cane',
    desc: 'A complete rejection of stark, cold modernism. We utilized heavily textured, organic materials sourced directly from South America to create a space that feels deeply rooted in the earth, despite being located in the heart of the city.'
  },
  { 
    id: 4, 
    title: 'LUMINA ESTATE', 
    subtitle: 'Turnkey perfection down to the finest micro-detail.', 
    img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2874&auto=format&fit=crop',
    client: 'Venture Capital Firm (Corporate Retreat)',
    year: '2024',
    materials: 'Limestone, Platinum, Polished Plaster',
    desc: 'An extreme exercise in turnkey luxury. We did not just design the architecture; we selected the bed linens, curated the library, and stocked the wine cellar. When the client turned the key for the first time, every single variable had been calculated and perfected.'
  },
];

export default function Showcase() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    // Only apply horizontal pinning on Desktop
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

    // Mobile specific animations
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

    const handleNext = (e) => {
    e.stopPropagation();
    if(!activeProject) return;
    const idx = projects.findIndex(p => p.id === activeProject.id);
    setActiveProject(projects[(idx + 1) % projects.length]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if(!activeProject) return;
    const idx = projects.findIndex(p => p.id === activeProject.id);
    setActiveProject(projects[(idx - 1 + projects.length) % projects.length]);
  };

  return (
    <>
      <section ref={containerRef} className="relative md:h-screen w-full bg-[#050505] text-[#F9F9F7] md:overflow-hidden flex items-center py-20 md:py-0">
        
        {/* Massive Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[30vw] font-serif opacity-[0.15] whitespace-nowrap tracking-tighter">
            DS MIAMI
          </h1>
        </div>

        <div ref={scrollWrapperRef} className="flex flex-col md:flex-row md:h-full w-full md:w-[400vw] relative z-10 gap-20 md:gap-0">
          {projects.map((proj, i) => (
            <div key={proj.id} className="showcase-panel w-full md:w-screen md:h-full flex flex-col justify-center items-center relative px-4 md:px-20">
              
              {/* Added onClick here to open modal */}
              <div 
                onClick={() => setActiveProject(proj)}
                className="cursor-explore w-full max-w-5xl aspect-[4/5] md:aspect-[21/9] relative overflow-hidden group rounded-sm md:rounded-none"
              >
                <Image src={proj.img} alt={proj.title} fill sizes="(max-width: 768px) 100vw, 80vw" priority={i === 0} className="proj-img object-cover transform md:scale-110 opacity-100 transition-all duration-700" />
                {/* Accessibility Fix: Gradient overlay to ensure text contrast (DeepSeek Flaw #2) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
              </div>
              
              <div className="relative mt-6 md:mt-0 md:absolute md:bottom-32 md:left-32 z-20 w-full text-center md:text-left pointer-events-none">
                <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#D4AF37] mb-2">0{proj.id} &#8212; PROJECT</p>
                <h2 className="text-3xl md:text-7xl font-serif uppercase tracking-widest text-white drop-shadow-2xl">{proj.title}</h2>
                <p className="font-light text-white/70 max-w-md mt-4 mx-auto md:mx-0">{proj.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Skip Navigation Interface - Rewritten as native unbreakable HTML anchors */}
        
        {/* Skip Navigation Interface - Ultra Smooth Lenis Integration */}
        <div className="hidden md:flex absolute bottom-8 left-0 w-full justify-center items-center gap-8 z-50 pointer-events-auto">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const target = document.getElementById("hero-target");
              if (target && window.lenis) {
                // Slower duration (2.5s) and gentle easeInOut curve for cinematic feel
                window.lenis.scrollTo(target, { duration: 2.5, easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 });
              }
            }}
            aria-label="Skip up to Hero section"
            className="font-mono text-[10px] tracking-[0.3em] text-white/50 hover:text-white uppercase transition-colors"
          >
            &#8593; Skip to Hero
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const target = document.getElementById("philosophy-target");
              if (target && window.lenis) {
                window.lenis.scrollTo(target, { duration: 2.5, easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 });
              }
            }}
            aria-label="Skip down to Philosophy section"
            className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] hover:text-white uppercase transition-colors"
          >
            Skip Showcase &#8595;
          </button>
        </div>
      </section>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
          <div className="w-full max-w-[1400px] h-full max-h-[90vh] bg-[#0A0A0A] border border-white/10 flex flex-col md:flex-row relative overflow-hidden shadow-2xl">
            
            <button 
              onClick={() => setActiveProject(null)} 
              className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] font-mono text-xs tracking-widest z-50 transition-colors bg-[#0A0A0A] p-2 rounded-full md:bg-transparent"
            >
              CLOSE [X]
            </button>
            
            {/* Left: Image */}
            <div className="w-full md:w-[55%] h-[40vh] md:h-full relative">
               <Image src={activeProject.img} alt={activeProject.title} fill className="object-cover" />
            </div>
            
            {/* Right: Data */}
            <div className="w-full md:w-[45%] h-[60vh] md:h-full p-8 md:p-16 overflow-y-auto">
               <div className="flex flex-col min-h-full justify-start md:justify-center py-4">
                 <p className="font-mono text-xs tracking-[0.4em] text-[#D4AF37] mb-4 mt-8 md:mt-0">PROJECT DETAILS</p>
                 <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter mb-8 leading-none">{activeProject.title}</h2>
                 
                 <div className="grid grid-cols-2 gap-8 mb-8 border-y border-white/10 py-8">
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Client</p>
                      <p className="font-serif text-sm md:text-lg">{activeProject.client}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Completion Year</p>
                      <p className="font-serif text-sm md:text-lg">{activeProject.year}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Primary Materials</p>
                      <p className="font-serif text-sm md:text-lg text-[#D4AF37]">{activeProject.materials}</p>
                    </div>
                 </div>

                 <p className="font-light text-white/60 leading-relaxed text-sm md:text-lg mb-12">
                   {activeProject.desc}
                 </p>

                 <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mt-auto">
                   <button className="w-fit px-8 py-4 border border-[#D4AF37] text-[#D4AF37] font-mono text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#050505] transition-colors duration-300">
                     Request Case Study
                   </button>
                   
                   {/* Next/Prev Navigation */}
                   <div className="flex items-center gap-4">
                     <button onClick={handlePrev} className="p-4 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-full flex items-center justify-center group">
                       <span className="font-mono text-xs tracking-widest uppercase group-hover:-translate-x-1 transition-transform">&#8592; PREV</span>
                     </button>
                     <button onClick={handleNext} className="p-4 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-full flex items-center justify-center group">
                       <span className="font-mono text-xs tracking-widest uppercase group-hover:translate-x-1 transition-transform">NEXT &#8594;</span>
                     </button>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}