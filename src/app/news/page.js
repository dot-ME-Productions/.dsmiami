'use client';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import NextGenFooter from '@/components/NextGenFooter';
import soundEngine from '@/lib/SoundEngine';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: "The Evolution of Tropical Modernism in Brickell",
    date: "August 12, 2026",
    excerpt: "How we integrate brutalist concrete forms with lush organic textures to redefine luxury living on the Miami skyline.",
  },
  {
    id: 2,
    title: "DS Miami Sweeps the 2026 Architectural Digest Awards",
    date: "July 04, 2026",
    excerpt: "Our team's visionary work at Gran Paraiso has been recognized for its bold use of monochromatic stone and custom kinetic lighting.",
  },
  {
    id: 3,
    title: "Sourcing Rare Materials: A Journey to the Carrara Quarries",
    date: "June 18, 2026",
    excerpt: "Go behind the scenes as our principal architects travel to Italy to hand-select the monolithic marble slabs for our upcoming waterfront estate.",
  },
  {
    id: 4,
    title: "The Acoustics of Luxury: Soundproofing High-Rise Havens",
    date: "May 22, 2026",
    excerpt: "True luxury is absolute silence. A technical dive into the hidden acoustic engineering that makes a DS Miami home an impenetrable sanctuary.",
  },
  {
    id: 5,
    title: "Redefining the Outdoor Room in South Florida",
    date: "April 09, 2026",
    excerpt: "Blurring the lines between interior opulence and exterior tropical beauty through seamless structural glazing and unified material palettes.",
  }
];

export default function News() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="w-full min-h-screen pt-40 px-6 md:px-16 text-[#F9F9F7] bg-transparent pb-32">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="mb-32 md:w-2/3"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C5A880] uppercase mb-6">
            Press & Insights
          </p>
          <h1 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-[0.85]">
            Latest <span className="italic text-[#C5A880]">News</span>
          </h1>
        </motion.div>

        {/* Articles List */}
        <div className="w-full flex flex-col gap-12 md:gap-24">
          {articles.map((article, idx) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-12 gap-8"
            >
              <div className="md:w-1/4">
                <p className="font-mono text-xs tracking-widest text-white/40 uppercase">
                  {article.date}
                </p>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-4xl font-serif mb-4 group-hover:italic group-hover:text-[#C5A880] transition-all duration-500">
                  {article.title}
                </h3>
                <p className="font-light text-white/60 text-sm md:text-base leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="md:w-1/4 flex md:justify-end">
                <Link 
                  href="#"
                  onMouseEnter={() => soundEngine.playSoftClick()}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase border border-white/20 rounded-full px-6 py-3 hover:bg-[#F9F9F7] hover:text-[#0C0F12] transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      <NextGenFooter />
    </SmoothScroll>
  );
}
