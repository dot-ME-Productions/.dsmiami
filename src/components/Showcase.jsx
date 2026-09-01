'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, title: 'BAYVIEW RESIDENCE', subtitle: 'An elegant dining space perched above the bay.', 
    img: 'https://ds-miami.com/wp-content/uploads/2026/06/ds-bayview-dining-room-city-view.webp',
    client: 'Private Executive', year: '2025', 
    materials: ['Italian Marble', 'Smoked Oak', 'Brushed Bronze'], sqft: '12,500 sq ft', timeline: '18 Months',
    challenge: 'The client required a dining space that maximized the panoramic city views without feeling exposed.',
    solution: 'We engineered a layout with reflective surfaces and strategic lighting to blur the line between interior and exterior, providing a seamless atmospheric flow.'
  },
  { 
    id: 2, title: 'MURANO PORTOFINO', subtitle: 'Oceanfront balcony terrace overlooking the skyline.', 
    img: 'https://ds-miami.com/wp-content/uploads/2026/06/oceanfront-murano-portofino-balcony-terrace-skyline-port-view-scaled.webp',
    client: 'International Client', year: '2024', 
    materials: ['Teak Wood', 'Limestone', 'Marine Glass'], sqft: '9,200 sq ft', timeline: '24 Months',
    challenge: 'Designing an outdoor living space capable of withstanding coastal weather while maintaining luxury comfort.',
    solution: 'We utilized marine-grade materials and custom low-profile furniture to preserve the view while providing maximum durability against the elements.'
  },
  { 
    id: 3, title: 'GRAN PARAISO', subtitle: 'Tropical modernism through organic textures.', 
    img: 'https://ds-miami.com/wp-content/uploads/2026/05/gran_paraiso_residences_living_reduced.webp',
    client: 'Anonymous Gallery Owner', year: '2023', 
    materials: ['Travertine', 'Woven Cane', 'Linen'], sqft: '14,000 sq ft', timeline: '14 Months',
    challenge: 'The client found stark modernism too cold and sterile, but despised traditional ornate design.',
    solution: 'We utilized heavily textured, porous organic materials sourced directly from South America. The raw tactile feedback grounds the space in the earth, rejecting sterile perfection.'
  },
  { 
    id: 4, title: 'TRUMP TOWERS', subtitle: 'Ocean-view living with grasscloth walls.', 
    img: 'https://ds-miami.com/wp-content/uploads/2026/06/trump-towers-living-tv-grasscloth-wall-ocean-view.webp',
    client: 'Venture Capital Firm', year: '2024', 
    materials: ['Grasscloth', 'Polished Plaster', 'Raw Steel'], sqft: '18,500 sq ft', timeline: '32 Months',
    challenge: 'An exercise in turnkey luxury for a coastal retreat that required immediate occupancy.',
    solution: 'We controlled every variable: custom furniture fabrication, premium grasscloth wallcoverings, and absolute atmospheric control.'
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
      <section ref={containerRef} className="relative md:h-screen w-full bg-[#0C0F12] text-[#F9F9F7] md:overflow-hidden flex items-center py-20 md:py-0">
        
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
                <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#C5A880] mb-2">0{proj.id} &#8212; PROJECT</p>
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
            className="font-mono text-[10px] tracking-[0.3em] text-[#C5A880] hover:text-white uppercase transition-colors"
          >
            Skip Showcase &#8595;
          </button>
        </div>
      </section>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[99999] bg-[#0C0F12]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
          <div className="w-full max-w-[1400px] h-full max-h-[90vh] bg-[#0A0A0A] border border-white/10 flex flex-col md:flex-row relative overflow-hidden shadow-2xl">
            
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4 bg-[#0A0A0A]/80 backdrop-blur-md p-2 rounded-full md:bg-transparent">
              <button onClick={handlePrev} className="text-white/50 hover:text-[#C5A880] font-mono text-xs tracking-widest transition-colors px-2">
                &#8592; PREV
              </button>
              <button onClick={handleNext} className="text-white/50 hover:text-[#C5A880] font-mono text-xs tracking-widest transition-colors px-2">
                NEXT &#8594;
              </button>
              <div className="w-px h-4 bg-white/20"></div>
              <button onClick={() => setActiveProject(null)} className="text-white hover:text-[#C5A880] font-mono text-xs tracking-widest transition-colors px-2 font-bold">
                CLOSE [X]
              </button>
            </div>
            
            {/* Left: Image */}
            <div className="w-full md:w-[55%] h-[40vh] md:h-full relative">
               <Image src={activeProject.img} alt={activeProject.title} fill className="object-cover" />
            </div>
            
            {/* Right: Data */}
            <div className="w-full md:w-[45%] h-[60vh] md:h-full p-6 md:p-10 overflow-y-auto">
               <div className="flex flex-col min-h-full justify-start md:justify-center py-2">
                 <p className="font-mono text-[10px] tracking-[0.4em] text-[#C5A880] mb-2 mt-8 md:mt-0">PROJECT DETAILS</p>
                 <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter mb-6 leading-none">{activeProject.title}</h2>
                 
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 border-y border-white/10 py-4 md:py-6">
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Client</p>
                      <p className="font-serif text-sm md:text-base">{activeProject.client}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Footprint</p>
                      <p className="font-serif text-sm md:text-base">{activeProject.sqft}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Timeline</p>
                      <p className="font-serif text-sm md:text-base">{activeProject.timeline}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Completion</p>
                      <p className="font-serif text-sm md:text-base">{activeProject.year}</p>
                    </div>
                 </div>

                 <div className="space-y-4 mb-6 md:mb-8">
                   <div>
                     <p className="font-mono text-[10px] tracking-widest text-[#C5A880] uppercase mb-1 md:mb-2">01 / The Challenge</p>
                     <p className="font-light text-white/80 leading-relaxed text-sm">{activeProject.challenge}</p>
                   </div>
                   <div>
                     <p className="font-mono text-[10px] tracking-widest text-[#C5A880] uppercase mb-1 md:mb-2">02 / The Solution</p>
                     <p className="font-light text-white/80 leading-relaxed text-sm">{activeProject.solution}</p>
                   </div>
                 </div>

                 {/* Material Palette (DeepSeek Upgrade 2) */}
                 <div className="mb-6 md:mb-8 p-4 bg-white/5 border border-white/10 rounded-sm">
                   <p className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase mb-3">Material Palette Explorer</p>
                   <div className="flex flex-wrap gap-4">
                     {activeProject.materials.map((mat, i) => (
                       <div key={i} className="flex items-center gap-3 group cursor-pointer">
                         <div className="w-6 h-6 rounded-full bg-[#111] border border-white/20 group-hover:border-[#C5A880] group-hover:scale-110 transition-all flex items-center justify-center overflow-hidden">
                            {/* Fake material texture simulation */}
                            <div className="w-full h-full opacity-50 bg-gradient-to-br from-white/20 to-transparent group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors">{mat}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mt-auto pt-2">
                   <button className="w-fit px-6 py-3 border border-[#C5A880] text-[#C5A880] font-mono text-[10px] tracking-widest uppercase hover:bg-[#C5A880] hover:text-[#0C0F12] transition-colors duration-300">
                     Request Case Study
                   </button>
                   

                 </div>
               </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}