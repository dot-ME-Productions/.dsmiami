'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Awards() {
  const logos = [
    "AD", "INSIDER", "HAUTE RESIDENCE", "ELLE DECOR", "REALTOR.COM", "FORBES"
  ];

  return (
    <section className="py-24 px-8 bg-[#111111] text-ds-light overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="text-sm md:text-base tracking-[0.3em] uppercase text-ds-gold">Honoured to be featured in international design</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-70">
        {logos.map((logo, idx) => (
          <div key={idx} className="font-serif text-2xl md:text-4xl tracking-widest text-ds-light/80 hover:text-ds-light transition-colors cursor-default">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
