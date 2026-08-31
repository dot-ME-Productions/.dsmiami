'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const archiveData = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
    title: 'THE VILLA BIANCA',
    award: 'WINNER - AIA MIAMI 2020',
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop',
    title: 'OBSIDIAN PENTHOUSE',
    award: 'NOMINEE - WORLD ARCHITECTURE FESTIVAL',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop',
    title: 'CASA DEL SOL',
    award: 'WINNER - ELLE DECOR A-LIST 2021',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop',
    title: 'THE BRUTALIST LOFT',
    award: 'SHORTLISTED - DEZEEN AWARDS 2022',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2874&auto=format&fit=crop',
    title: 'LUMINA RESIDENCE',
    award: 'WINNER - AD100 2023',
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop',
    title: 'ECLIPSE PAVILION',
    award: 'WINNER - LUXE RED AWARDS 2023',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop',
    title: 'THE GLASS SANCTUARY',
    award: 'HONOREE - INTERIOR DESIGN BOY 2024',
  },
  {
    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2927&auto=format&fit=crop',
    title: 'MONOLITH HOUSE',
    award: 'NOMINEE - ARCHDAILY BUILDING OF THE YEAR',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2874&auto=format&fit=crop',
    title: 'SILVER SCREEN ESTATE',
    award: 'WINNER - FLORIDA DESIGN AWARDS 2024',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2874&auto=format&fit=crop',
    title: 'NEO-CLASSIC RETREAT',
    award: 'SHORTLISTED - THE INTERNATIONAL ARCHITECTURE AWARDS',
  }
];

export default function Archive() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Insane Velocity Skew + Parallax Gallery
    const images = gsap.utils.toArray('.archive-image');
    const texts = gsap.utils.toArray('.archive-text');
    
    images.forEach((img, i) => {
      // Create a massive parallax speed differential between the image and the text
      gsap.to(img, {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      
      gsap.to(texts[i], {
        yPercent: 80, // Text moves opposite direction
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    // Progress Bar Sync
    gsap.to(".progress-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main ref={containerRef} className="w-full min-h-screen bg-[#050505] text-[#F9F9F7] pt-40 pb-32">
        
        {/* Intro Header */}
        <div className="w-full flex flex-col items-center justify-center text-center px-8 mb-32">
          <h1 className="text-[15vw] md:text-[12vw] font-serif leading-none tracking-tighter uppercase mix-blend-difference z-20">
            The Archive
          </h1>
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#D4AF37] mt-8">Selected Legacy Interventions</p>
        </div>

        {/* Massive Spaced Velocity Gallery */}
        <div className="relative w-full flex flex-col items-center gap-[40vh]">
          {archiveData.map((item, index) => (
            <div key={index} className="relative w-full max-w-[90vw] md:max-w-[65vw] aspect-[16/9] flex items-center justify-center">
              
              {/* Image Container with hidden overflow */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={item.url} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="archive-image object-cover transform translate-y-[20%]"
                />
              </div>

              {/* Opposing Parallax Text */}
              <div className="archive-text absolute z-10 text-center pointer-events-none mix-blend-difference">
                <h2 className="text-5xl md:text-8xl lg:text-[8vw] font-serif uppercase tracking-widest text-white leading-none whitespace-nowrap">
                  {item.title}
                </h2>
                <p className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-[#D4AF37] mt-4 opacity-80">
                  {item.award}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>
      
      {/* NO FOOTER AS REQUESTED */}
    </SmoothScroll>
  );
}