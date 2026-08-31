'use client';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

const awardsData = [
  { year: "2023", title: "Architectural Digest AD100", category: "Top Interior Design Firms", result: "Winner" },
  { year: "2023", title: "Luxe RED Awards", category: "Contemporary Interior Design", result: "Winner" },
  { year: "2022", title: "Dezeen Awards", category: "Interior Designer of the Year", result: "Shortlisted" },
  { year: "2021", title: "Elle Decor A-List", category: "Residential Interiors", result: "Winner" },
  { year: "2020", title: "AIA Miami", category: "Excellence in Interior Architecture", result: "Winner" },
  { year: "2019", title: "World Architecture Festival", category: "Best Residential Interior", result: "Nominee" },
];

export default function Awards() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen w-full bg-[#0C0F12] text-[#F9F9F7] flex flex-col pt-32 pb-24 px-8 md:px-16 lg:px-24 selection:bg-[#C5A880] selection:text-[#0C0F12]">
        
        <div className="w-full max-w-[1400px] mx-auto flex flex-col mt-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <h1 className="text-[10vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter uppercase">
              RECOGNITION <br/>
              <span className="italic text-white/30">& HONORS</span>
            </h1>
          </motion.div>

          <div className="w-full flex flex-col border-t border-white/20">
            {awardsData.map((award, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 hover:border-[#C5A880]/50 transition-colors duration-500 relative overflow-hidden"
              >
                {/* Hover Background Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C5A880]/0 via-[#C5A880]/5 to-[#C5A880]/0 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-bottom transition-all duration-700 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 relative z-10 w-full md:w-3/4">
                  <span className="font-mono text-sm tracking-widest text-white/40 group-hover:text-[#C5A880] transition-colors duration-500 w-16">
                    {award.year}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-3xl md:text-5xl font-serif tracking-tight group-hover:italic group-hover:text-[#C5A880] transition-all duration-500">
                      {award.title}
                    </h3>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mt-2">
                      {award.category}
                    </p>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 relative z-10 text-left md:text-right">
                  <span className={`px-4 py-2 rounded-full border text-[0.6rem] font-bold tracking-[0.2em] uppercase ${award.result === 'Winner' ? 'border-[#C5A880] text-[#C5A880]' : 'border-white/20 text-white/50 group-hover:border-white/50'}`}>
                    {award.result}
                  </span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </SmoothScroll>
  );
}