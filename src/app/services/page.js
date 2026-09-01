'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import NextGenFooter from '@/components/NextGenFooter';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    number: "01",
    title: "INTERIOR ARCHITECTURE",
    desc: "We alter spatial volumes, pushing walls and pulling ceilings to discover the ultimate flow and geometry of your environment.",
    img: "https://ds-miami.com/wp-content/uploads/2026/06/continuum-south-beach-master-bedroom-neutral-tones-black-lamps.webp"
  },
  {
    number: "02",
    title: "BESPOKE FURNISHINGS",
    desc: "Custom monolithic pieces designed exclusively for the scale and physics of your specific room, crafted in Italy.",
    img: "https://ds-miami.com/wp-content/uploads/2026/06/merrick-bedroom-grey-headboard-pendant-lights.webp"
  },
  {
    number: "03",
    title: "TURNKEY CURATION",
    desc: "From the initial blueprint to the final fold of the linen, we control every variable of the execution.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "LIGHTING DESIGN",
    desc: "Treating photons as a tangible material to shape mood, shadow, and architectural depth across all hours.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const followerRef = useRef(null);
  const [activeImg, setActiveImg] = useState(servicesList[0].img);

  useGSAP(() => {
    // 1. Initial Page Load Text Reveal
    gsap.fromTo('.intro-text', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', stagger: 0.1 }
    );

    // 2. The List Row Scroll Stagger
    const rows = gsap.utils.toArray('.service-row');
    rows.forEach((row) => {
      gsap.fromTo(row, 
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" }
        }
      );
    });

    // 3. Mouse Follower Engine for Images (Desktop Only)
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const xTo = gsap.quickTo(followerRef.current, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(followerRef.current, "y", { duration: 0.4, ease: "power3.out" });

      const moveFollower = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      
      window.addEventListener("mousemove", moveFollower);
      return () => window.removeEventListener("mousemove", moveFollower);
    });
  }, { scope: containerRef });

  const handleMouseEnter = (img) => {
    setActiveImg(img);
    gsap.to(followerRef.current, { scale: 1, opacity: 1, rotation: 5, duration: 0.5, ease: "back.out(1.5)" });
  };

  const handleMouseLeave = () => {
    gsap.to(followerRef.current, { scale: 0.5, opacity: 0, rotation: -5, duration: 0.4, ease: "power2.in" });
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      {/* Absolute Mouse Follower (Image Reveal) */}
      <div 
        ref={followerRef} 
        className="hidden md:block fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-[50] opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl"
      >
        <Image src={activeImg} alt="Service preview" fill sizes="400px" className="object-cover" priority />
      </div>

      <main ref={containerRef} className="w-full min-h-screen bg-[#0C0F12] text-[#F9F9F7] pt-40 pb-32">
        
        {/* Intro Header */}
        <div className="w-full px-8 md:px-16 mb-32 overflow-hidden">
          <p className="intro-text font-mono text-xs tracking-[0.4em] uppercase text-[#C5A880] mb-8">Our Capabilities</p>
          <div className="overflow-hidden">
            <h1 className="intro-text text-5xl md:text-8xl lg:text-[10vw] font-serif leading-[0.85] tracking-tighter uppercase max-w-7xl">
              Precision in
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="intro-text text-5xl md:text-8xl lg:text-[10vw] font-serif leading-[0.85] tracking-tighter uppercase max-w-7xl italic text-white/50">
              every dimension.
            </h1>
          </div>
        </div>

        {/* Massive Typographical List (Hover Triggers) */}
        <div className="w-full flex flex-col px-4 md:px-16">
          <div className="border-t border-white/10 w-full"></div>
          
          {servicesList.map((srv, index) => (
            <div 
              key={index} 
              onMouseEnter={() => handleMouseEnter(srv.img)}
              onMouseLeave={handleMouseLeave}
              className="service-row group w-full py-12 md:py-20 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors duration-500 hover:bg-white/5 px-4"
            >
              
              <div className="flex items-start gap-8 md:gap-16">
                <span className="font-mono text-sm md:text-lg text-[#C5A880] mt-2 group-hover:-translate-y-2 transition-transform duration-500">
                  {srv.number}
                </span>
                <h2 className="text-4xl md:text-7xl lg:text-[6vw] font-serif uppercase tracking-tighter group-hover:pl-8 transition-all duration-700 ease-out">
                  {srv.title}
                </h2>
              </div>

              <div className="mt-8 md:mt-0 md:w-1/3 overflow-hidden">
                <p className="font-light text-white/50 text-sm md:text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                  {srv.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </main>
      
      <NextGenFooter />
    </SmoothScroll>
  );
}