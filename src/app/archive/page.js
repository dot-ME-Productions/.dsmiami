'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const archiveData = [
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop', title: 'THE VILLA BIANCA', award: 'WINNER - AIA MIAMI 2020', category: 'Residential', description: 'A masterclass in coastal minimalism, blending stark white geometries with the organic flow of the Atlantic. The spatial sequence is dictated entirely by the movement of natural light.' },
  { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop', title: 'OBSIDIAN PENTHOUSE', award: 'NOMINEE - WORLD ARCHITECTURE', category: 'Commercial', description: 'Dark, moody, and undeniably powerful. This executive space utilizes matte black textures, fluted glass, and monolithic marble to project absolute authority and absolute calm.' },
  { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop', title: 'CASA DEL SOL', award: 'WINNER - ELLE DECOR A-LIST', category: 'Hospitality', description: 'A vibrant homage to Mediterranean warmth, featuring curated artisan terracotta, expansive loggias, and woven organic fibers that blur the boundary between shelter and nature.' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop', title: 'THE BRUTALIST LOFT', award: 'SHORTLISTED - DEZEEN AWARDS', category: 'Residential', description: 'Exposed board-formed concrete meets unapologetic luxury. This loft preserves the industrial soul of the structure while introducing impossibly soft Italian wools and warm brass accents.' },
  { url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2874&auto=format&fit=crop', title: 'LUMINA RESIDENCE', award: 'WINNER - AD100 2023', category: 'Residential', description: 'Engineered entirely around a central glass atrium, this residence pulls the sky down into the living spaces, creating an ever-shifting canvas of shadow and illumination.' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop', title: 'ECLIPSE PAVILION', award: 'WINNER - LUXE RED AWARDS', category: 'Commercial', description: 'A sculptural intervention designed for high-end retail. The swooping curves and kinetic lighting systems guide consumer psychology without them ever noticing.' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop', title: 'THE GLASS SANCTUARY', award: 'HONOREE - INTERIOR DESIGN BOY', category: 'Hospitality', description: 'Floating above a dense canopy, this wellness retreat utilizes seamless glazing to eliminate the walls entirely, offering guests an unfiltered psychological reset.' }
];

export default function Archive() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState('All');
  
  const filteredData = filter === 'All' ? archiveData : archiveData.filter(d => d.category === filter);

  useGSAP(() => {
    // Reveal animations for the editorial layout
    const items = gsap.utils.toArray('.archive-item');
    
    items.forEach((item) => {
      const img = item.querySelector('.archive-img');
      const content = item.querySelector('.archive-content');
      
      gsap.fromTo(img, 
        { clipPath: "inset(20% 20% 20% 20% round 100px)", filter: "grayscale(1) brightness(0.5)" },
        { 
          clipPath: "inset(0% 0% 0% 0% round 0px)", 
          filter: "grayscale(0) brightness(1)",
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(content,
        { opacity: 0, x: item.classList.contains('flex-row-reverse') ? -50 : 50 },
        { 
          opacity: 1, x: 0, 
          duration: 1.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [filter] });

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main ref={containerRef} className="w-full min-h-screen bg-[#0C0F12] text-[#F9F9F7] pt-40 pb-32">
        
        {/* Intro Header */}
        <div className="w-full flex flex-col items-center justify-center text-center px-8 mb-24">
          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-none tracking-tighter uppercase z-20">
            The Archive
          </h1>
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#C5A880] mt-8">Selected Legacy Interventions</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-32 px-4 z-20 relative">
          {['All', 'Residential', 'Commercial', 'Hospitality'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] md:text-xs tracking-widest uppercase px-6 py-2 rounded-full border transition-all duration-300 ${filter === cat ? 'border-[#C5A880] text-[#C5A880]' : 'border-white/10 text-white/40 hover:border-white/40'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Layout Gallery */}
        <div className="relative w-full flex flex-col gap-32 md:gap-48 px-6 md:px-16 lg:px-32">
          {filteredData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.title} 
                className={`archive-item relative w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                {/* Image Column */}
                <div className="archive-img w-full md:w-3/5 aspect-[4/3] relative overflow-hidden group cursor-pointer">
                  <Image 
                    src={item.url} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                {/* Content Column (Fills the empty space) */}
                <div className={`archive-content w-full md:w-2/5 flex flex-col justify-center ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} text-center`}>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#C5A880] mb-4">
                    {item.category} &mdash; {item.award}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-tight leading-none mb-8">
                    {item.title}
                  </h2>
                  <p className={`font-light text-white/60 text-sm md:text-base leading-relaxed max-w-md ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    {item.description}
                  </p>
                  
                  <button className="mt-12 group flex items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-white hover:text-[#C5A880] transition-colors">
                    <span className="w-8 h-[1px] bg-white group-hover:bg-[#C5A880] group-hover:w-12 transition-all"></span>
                    View Intervention
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </SmoothScroll>
  );
}