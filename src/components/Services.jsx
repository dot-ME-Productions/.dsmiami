'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { title: "Interior Design", num: "01", desc: "Bespoke spatial curation that reflects your personal narrative, featuring hand-sourced materials and custom furnishings." },
  { title: "Architecture", num: "02", desc: "Visionary structural design that seamlessly blends modern aesthetics with timeless structural integrity." },
  { title: "Turnkey Solutions", num: "03", desc: "White-glove project management from initial blueprint to final styling, completely effortless for our clients." },
  { title: "Custom Millwork", num: "04", desc: "Artisanal cabinetry and architectural woodwork designed to perfectly fit the exact contours of your space." }
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="py-32 px-8 md:px-16 bg-ds-light text-ds-dark">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase mb-24 text-ds-gold font-bold">Expertise</p>
        
        <div className="border-t border-ds-dark/20">
          {services.map((srv, idx) => (
            <div 
              key={idx}
              className="group border-b border-ds-dark/20 py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors duration-500 hover:bg-ds-dark hover:text-ds-light px-8 -mx-8"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start gap-8 md:w-1/2">
                <span className="text-sm font-medium opacity-50 group-hover:text-ds-gold transition-colors">{srv.num}</span>
                <h3 className="text-4xl md:text-6xl font-serif">{srv.title}</h3>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-between items-center">
                <p className="text-sm opacity-70 group-hover:opacity-100 max-w-sm">{srv.desc}</p>
                <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-ds-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

