'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import NextGenFooter from '@/components/NextGenFooter';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    number: "01",
    title: "Interior Architecture",
    desc: "We alter spatial volumes, pushing walls and pulling ceilings to discover the ultimate flow and geometry of your environment.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Bespoke Furnishings",
    desc: "Custom monolithic pieces designed exclusively for the scale and physics of your specific room, crafted in Italy.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Turnkey Curation",
    desc: "From the initial blueprint to the final fold of the linen, we control every variable of the execution.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Lighting Design",
    desc: "Treating photons as a tangible material to shape mood, shadow, and architectural depth across all hours.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
  }
];

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal titles on scroll
    const rows = gsap.utils.toArray('.service-row');
    
    rows.forEach((row) => {
      const title = row.querySelector('.service-title');
      const img = row.querySelector('.service-img');
      const text = row.querySelector('.service-text');
      
      gsap.fromTo([title, text], 
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(img, 
        { scale: 1.2, opacity: 0, rotation: 5 },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main ref={containerRef} className="w-full bg-[#050505] text-[#F9F9F7] pt-40 pb-32">
        
        {/* Intro Header */}
        <div className="w-full px-8 md:px-16 mb-40">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-8">Our Capabilities</p>
          <h1 className="text-5xl md:text-8xl lg:text-[10vw] font-serif leading-[0.85] tracking-tighter uppercase max-w-7xl">
            Precision in <br/>
            <span className="italic text-white/50">every dimension.</span>
          </h1>
        </div>

        {/* Services List */}
        <div className="w-full flex flex-col gap-32 md:gap-48 px-8 md:px-16">
          {servicesList.map((srv, index) => (
            <div key={index} className="service-row w-full flex flex-col md:flex-row items-center gap-12 md:gap-24">
              
              {/* Left Side: Number & Image */}
              <div className="w-full md:w-1/2 relative">
                <span className="absolute -top-12 -left-4 md:-left-12 text-[15vw] md:text-[10vw] font-serif opacity-10 text-white z-0 pointer-events-none mix-blend-screen">
                  {srv.number}
                </span>
                <div className="relative z-10 w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm">
                  <img src={srv.img} alt={srv.title} className="service-img w-full h-full object-cover hover:scale-105 transition-all duration-700" />
                </div>
              </div>

              {/* Right Side: Title & Desc */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="service-title text-4xl md:text-7xl lg:text-[5vw] font-serif uppercase tracking-tight mb-8">
                  {srv.title}
                </h2>
                <p className="service-text text-lg md:text-2xl font-light text-white/60 max-w-xl leading-relaxed">
                  {srv.desc}
                </p>
                <div className="service-text mt-12 w-12 h-[1px] bg-[#D4AF37]"></div>
              </div>

            </div>
          ))}
        </div>

      </main>
      
      <NextGenFooter />
    </SmoothScroll>
  );
}