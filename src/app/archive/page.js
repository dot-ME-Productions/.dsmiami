'use client';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';

const archiveData = [
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-living-room-figurative-art-glass-shelving.webp', title: 'THE GLASS SANCTUARY', award: 'HONOREE - INTERIOR DESIGN BOY', category: 'Hospitality', description: 'Floating above a dense canopy, this wellness retreat utilizes seamless glazing to eliminate the walls entirely, offering guests an unfiltered psychological reset.', shapeClass: 'aspect-[4/3] rounded-tl-[150px] rounded-br-[150px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/continuum-south-beach-master-bedroom-neutral-tones-black-lamps.webp', title: 'MONOLITH HOUSE', award: 'NOMINEE - ARCHDAILY BUILDING OF THE YEAR', category: 'Residential', description: 'Carved from solid limestone, this brutalist marvel blends severe architectural lines with unimaginably soft, bespoke interior textiles to create perfect tension.', shapeClass: 'aspect-square rounded-[30px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/merrick-bedroom-grey-headboard-pendant-lights.webp', title: 'SILVER SCREEN ESTATE', award: 'WINNER - FLORIDA DESIGN AWARDS', category: 'Commercial', description: 'A massive coastal compound designed for a media executive. Features a subterranean screening room and an infinity pool that visually merges with Biscayne Bay.', shapeClass: 'aspect-[16/9] rounded-none' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/trump-towers-living-tv-grasscloth-wall-ocean-view.webp', title: 'NEO-CLASSIC RETREAT', award: 'SHORTLISTED - INTERNATIONAL ARCHITECTURE', category: 'Hospitality', description: 'An abandoned 1920s bank vault transformed into a subterranean speakeasy and private members club, retaining the original steel doors and brass deposit boxes.', shapeClass: 'aspect-[4/5] rounded-t-[200px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/new-build-cocoplum-home-living-tv-sectional.webp', title: 'AQUA VILLA', award: 'FEATURED - ARCHITECTURAL DIGEST', category: 'Residential', description: 'A sweeping modernist home where water dictates the layout. The living room is bisected by a glass-bottomed koi pond that reflects geometric shadows all day.', shapeClass: 'aspect-[3/4] rounded-[50%]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/oceanfront-murano-portofino-balcony-terrace-skyline-port-view-scaled.webp', title: 'THE IRON ATELIER', award: 'WINNER - RESTAURANT & BAR DESIGN AWARDS', category: 'Commercial', description: 'Industrial chic elevated to its highest form. Rusted corten steel, charred yakisugi wood, and hand-blown amber glass create a deeply moody dining experience.', shapeClass: 'aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/05/optimized_modern_kitchen_livingroom-scaled.webp', title: 'TERRA COTTA CANYON', award: 'HONOREE - FRAME AWARDS', category: 'Hospitality', description: 'A boutique hotel lobby that feels carved from the desert itself. Undulating plaster walls and monolithic stone reception desks reject the concept of right angles.', shapeClass: 'aspect-[16/9] rounded-b-full' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/great-room-round-mirror-suede-armchairs-gallery-wall-scaled.webp', title: 'SKYLINE PENTHOUSE', award: 'WINNER - LUXE RED AWARDS', category: 'Residential', description: 'A breathtaking penthouse offering panoramic views of the Miami skyline, featuring custom millwork and expansive glass walls.', shapeClass: 'aspect-[4/5] rounded-tr-[250px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/06/ds-bayview-dining-room-city-view.webp', title: 'BAYVIEW DINING', award: 'FEATURED - ELLE DECOR', category: 'Hospitality', description: 'An elegant dining space perched above the bay, utilizing reflective surfaces and dramatic lighting to blur the line between interior and exterior.', shapeClass: 'aspect-square rounded-tl-[100px]' },
  { url: 'https://ds-miami.com/wp-content/uploads/2026/05/gran_paraiso_residences_living_reduced.webp', title: 'GRAN PARAISO', award: 'HONOREE - AIA MIAMI', category: 'Residential', description: 'Minimalist luxury at its finest. This residence employs a restrained color palette and organic textures to create a serene coastal escape.', shapeClass: 'aspect-[3/4] rounded-bl-[150px] rounded-tr-[150px]' }
];

export default function Archive() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen w-full bg-[#F4F0EA] text-[#0C0F12] flex flex-col pt-32 pb-24 px-6 md:px-16 selection:bg-[#C5A880] selection:text-[#0C0F12]">
        
        <div className="w-full max-w-[1400px] mx-auto flex flex-col mt-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 md:mb-40"
          >
            <h1 className="text-[12vw] md:text-[9vw] font-serif leading-[0.85] tracking-tighter uppercase relative z-10 mix-blend-difference text-white">
              MASTER <br/>
              <span className="italic">ARCHIVE</span>
            </h1>
          </motion.div>

          <div className="w-full flex flex-col gap-32 md:gap-48">
            {archiveData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                
                {/* Project Image */}
                <div className="w-full md:w-1/2 relative group perspective-1000">
                  <div className={`relative overflow-hidden w-full ${project.shapeClass} will-change-transform transition-transform duration-1000 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] shadow-2xl`}>
                    <Image 
                      src={project.url} 
                      alt={project.title} 
                      fill 
                      className="object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0C0F12]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply pointer-events-none"></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0C0F12]/40 mb-4">
                    {project.category}
                  </p>
                  
                  <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-6 group-hover:italic transition-all duration-500">
                    {project.title}
                  </h2>
                  
                  <p className={`font-light text-[#0C0F12]/70 text-sm md:text-base max-w-md mb-10 leading-relaxed ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    {project.description}
                  </p>

                  <div className="px-5 py-2 border border-[#0C0F12]/20 rounded-full font-mono text-[9px] tracking-widest uppercase text-[#0C0F12]/60 hover:bg-[#C5A880] hover:text-[#0C0F12] hover:border-[#C5A880] transition-colors duration-300 cursor-default">
                    {project.award}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </SmoothScroll>
  );
}