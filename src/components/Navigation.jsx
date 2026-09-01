'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import soundEngine from '@/lib/SoundEngine';

const menuData = [
  { name: 'Manifesto', path: '/', img: 'https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-living-room-figurative-art-glass-shelving.webp' },
  { name: 'Archive', path: '/archive', img: 'https://ds-miami.com/wp-content/uploads/2026/06/merrick-bedroom-grey-headboard-pendant-lights.webp' },
  { name: 'Contact', path: '/contact', img: 'https://ds-miami.com/wp-content/uploads/2026/06/new-build-cocoplum-home-living-tv-sectional.webp' }
];

const subLinks = [
  { name: 'Awards', path: '/awards' },
  { name: 'Services', path: '/services' },
  { name: 'Studio', path: '/studio' },
  { name: 'Who we are', path: '/who-we-are' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pathname = usePathname();
  
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const subLinksRef = useRef([]);
  const tl = useRef(null);
  
  // Floating Image Refs
  const floatingImgRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  // Auto-close on navigation
  useEffect(() => { if (isOpen) { setTimeout(() => setIsOpen(false), 600); } }, [pathname]);

  useGSAP(() => {
    // 1. Awwwards-tier Menu Opening Animation (Curtain reveal from bottom + glass blur)
    tl.current = gsap.timeline({ paused: true });
    
    tl.current.to(overlayRef.current, { 
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
      duration: 1, 
      ease: "power4.inOut" 
    });
    
    // Staggered text rise
    tl.current.fromTo(linksRef.current, 
      { yPercent: 120, opacity: 0, rotateX: 20 }, 
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "power4.out" }, 
      "-=0.5"
    );
    
    tl.current.fromTo(subLinksRef.current, 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" }, 
      "-=0.6"
    );
    
    // 2. Setup Floating Image Trackers
    xTo.current = gsap.quickTo(floatingImgRef.current, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(floatingImgRef.current, "y", { duration: 0.6, ease: "power3.out" });
    
  }, { scope: containerRef });

  useEffect(() => {
    if (isOpen) { 
      document.body.style.overflow = 'hidden'; 
      tl.current.timeScale(1).play(); 
    } else { 
      document.body.style.overflow = ''; 
      tl.current.timeScale(1.5).reverse(); // Reverse slightly faster
    }
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if(xTo.current && yTo.current) {
      // Offset by half width/height so mouse is centered
      xTo.current(e.clientX - 130); 
      yTo.current(e.clientY - 170);
    }
  };

  const handleMouseEnterLink = (idx) => {
    setHoveredIndex(idx);
    gsap.to(floatingImgRef.current, { 
      scale: 1, 
      opacity: 1, 
      rotation: Math.random() * 8 - 4, // Slight organic tilt
      duration: 0.5, 
      ease: "back.out(1.5)" 
    });
  };

  const handleMouseLeaveLink = () => {
    setHoveredIndex(null);
    gsap.to(floatingImgRef.current, { 
      scale: 0.5, 
      opacity: 0, 
      rotation: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    });
  };

  return (
    <div ref={containerRef}>
      
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent py-5 px-6 md:px-16 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex flex-col uppercase group pointer-events-auto text-[#F9F9F7]">
          <div className="text-xl md:text-2xl font-serif tracking-[0.2em] font-medium flex items-center gap-1 group-hover:text-[#C5A880] group-hover:italic transition-all duration-500">
            <span>DESIGN</span>
            <span className="opacity-40 font-light text-2xl mx-1 not-italic">/</span>
            <span>SOLUTIONS</span>
          </div>
          <div className="text-[0.45rem] md:text-[0.55rem] tracking-[0.3em] font-sans mt-[2px] opacity-60 group-hover:opacity-100 transition-opacity">
            Turnkey Luxury Interiors
          </div>
        </Link>
        <button onClick={() => setIsOpen(true)} className="flex flex-col gap-[6px] group p-4 -mr-4 pointer-events-auto">
          <div className="w-8 h-[1px] bg-[#F9F9F7] origin-right transition-transform duration-500 group-hover:scale-x-75"></div>
          <div className="w-8 h-[1px] bg-[#F9F9F7] origin-right transition-transform duration-500 group-hover:scale-x-50"></div>
        </button>
      </header>

      {/* The Fullscreen Glass Menu */}
      <div 
        ref={overlayRef} 
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-[60] bg-[#0C0F12]/95 backdrop-blur-2xl text-[#F9F9F7] flex flex-col justify-center overflow-hidden pointer-events-none" 
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
      >
        
        {/* Floating Image Follower */}
        <div 
          ref={floatingImgRef}
          className="fixed top-0 left-0 w-[260px] h-[340px] pointer-events-none z-0 opacity-0 scale-50 origin-center will-change-transform rounded-sm overflow-hidden shadow-2xl hidden md:block"
        >
          {menuData.map((link, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
              <Image src={link.img} alt="Preview" fill className="object-cover" sizes="260px" />
            </div>
          ))}
          {/* Glass overlay on the image for premium feel */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Menu Content */}
        <div className="absolute top-6 right-6 md:top-8 md:right-16 z-[70] pointer-events-auto">
          <button onClick={() => setIsOpen(false)} className="px-6 py-3 border border-white/10 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
            CLOSE [X]
          </button>
        </div>

        <div className="relative z-20 w-full h-full px-6 md:px-16 flex flex-col items-center justify-center pointer-events-none">
          
          <nav className="flex flex-col items-center gap-0 w-full pointer-events-auto z-10">
            {menuData.map((link, idx) => (
              <div 
                key={idx} 
                className="overflow-hidden py-1 md:py-2" 
                onMouseEnter={() => handleMouseEnterLink(idx)}
                onMouseLeave={handleMouseLeaveLink}
              >
                <Link 
                  href={link.path} 
                  onClick={() => setIsOpen(false)} 
                  ref={el => linksRef.current[idx] = el} 
                  className="inline-block text-[14vw] md:text-[9vw] font-serif uppercase leading-[0.85] tracking-tighter hover:italic hover:text-[#C5A880] transition-all duration-300"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 md:left-16 right-6 md:right-16 flex flex-col pointer-events-auto border-t border-white/10 pt-6 gap-6">
            
            <div className="flex justify-between items-center w-full">
              <nav className="flex justify-between w-full gap-4">
              {subLinks.map((link, idx) => (
                <div key={idx} className="overflow-hidden">
                  <Link 
                    href={link.path} 
                    onClick={() => setIsOpen(false)} 
                    ref={el => subLinksRef.current[idx] = el} 
                    className="text-xs md:text-sm font-mono tracking-widest uppercase opacity-50 hover:opacity-100 hover:text-[#C5A880] transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>
            </div>

            {/* Hidden Contact Info in bottom since we spread the nav full width */}
            <div className="hidden md:flex justify-between w-full font-mono text-[9px] md:text-[0.55rem] tracking-[0.3em] uppercase opacity-30">
              <a href="mailto:info@designsolutionsmiami.com" className="hover:text-[#C5A880] transition-colors">hello@designsolutions.com</a>
              <a href="tel:+17862244923" className="hover:text-[#C5A880] transition-colors">+1 (786) 224-4923</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}