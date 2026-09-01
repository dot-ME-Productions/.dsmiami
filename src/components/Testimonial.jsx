'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.testimonial-quote',
      { opacity: 0, y: 50, rotateX: -20 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 1.5, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-32 md:py-48 bg-[#0C0F12] text-[#F9F9F7] relative z-20 flex justify-center items-center px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <span className="text-[#C5A880] text-6xl md:text-8xl font-serif leading-none mb-8 opacity-50">&ldquo;</span>
        
        <h2 className="testimonial-quote text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide leading-tight md:leading-snug italic text-white/90 will-change-transform perspective-1000">
          Design Solutions doesn&apos;t just decorate a house; they engineer an atmosphere. Luciana and her team possess an uncanny ability to translate abstract emotions into physical, architectural reality.
        </h2>
        
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C5A880]">Jonathan R.</p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/50">Private Client &mdash; Obsidian Penthouse</p>
        </div>

      </div>
    </section>
  );
}