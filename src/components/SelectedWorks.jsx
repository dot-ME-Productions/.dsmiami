'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "Villa Venetian", location: "Miami Beach", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop" },
  { name: "Brickell Penthouse", location: "Downtown Miami", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop" },
  { name: "Sunny Isles Estate", location: "Sunny Isles", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop" },
  { name: "Bal Harbour Modern", location: "Bal Harbour", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop" }
];

export default function SelectedWorks() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={sectionRef} className="h-screen bg-ds-dark text-ds-light overflow-hidden flex flex-col justify-center">
      <div className="absolute top-16 md:top-32 left-8 md:left-16 z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-ds-light">Selected <span className="italic text-ds-gold">Works</span></h2>
      </div>

      <div ref={scrollRef} className="flex gap-16 px-8 md:px-32 pt-24 items-center h-[70vh] w-[max-content]">
        {projects.map((proj, idx) => (
          <div key={idx} className="relative w-[70vw] md:w-[40vw] h-full flex-shrink-0 group cursor-pointer overflow-hidden">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={proj.img} 
                alt={proj.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-3xl font-serif">{proj.name}</h3>
              <p className="tracking-widest uppercase text-xs mt-2 text-ds-gold">{proj.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
