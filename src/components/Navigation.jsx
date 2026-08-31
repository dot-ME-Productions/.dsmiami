'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

const menuData = [
  { 
    name: 'Manifesto', 
    path: '/',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  { 
    name: 'Archive', 
    path: '/archive',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop'
    ]
  },
  { 
    name: 'Contact', 
    path: '/contact',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const subLinks = [
  { name: 'AWARDS', path: '/awards' },
  { name: 'SERVICES', path: '/services' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const pathname = usePathname();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const subLinksRef = useRef([]);
  const tl = useRef(null);

  useEffect(() => { if (isOpen) { setTimeout(() => setIsOpen(false), 600); } }, [pathname]);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(overlayRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: "power4.inOut" });
    tl.current.fromTo(linksRef.current, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out" }, "-=0.4");
    tl.current.fromTo(subLinksRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=0.6");
  }, { scope: containerRef });

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; tl.current.play(); } 
    else { document.body.style.overflow = ''; tl.current.reverse(); }
  }, [isOpen]);

  const closeBtnRef = useRef(null);
  useEffect(() => {
    const btn = closeBtnRef.current;
    if(!btn) return;
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.5, ease: "power2.out" });
    };
    const handleMouseLeave = () => { gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); };
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => { btn.removeEventListener("mousemove", handleMouseMove); btn.removeEventListener("mouseleave", handleMouseLeave); }
  }, []);

  const handleLinkClick = () => { setIsOpen(false); };

  useEffect(() => {
    linksRef.current.forEach(link => {
      if(!link) return;
      const handleMove = (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.05, y: y * 0.1, duration: 0.5, ease: "power2.out" });
      };
      const handleLeave = () => { gsap.to(link, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); };
      link.addEventListener("mousemove", handleMove);
      link.addEventListener("mouseleave", handleLeave);
    });
  }, []);

  return (
    <div ref={containerRef}>
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent py-5 px-8 md:px-16 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" onClick={handleLinkClick} className="flex flex-col uppercase group pointer-events-auto text-[#F9F9F7]">
          <div className="text-xl md:text-2xl font-serif tracking-[0.2em] font-medium flex items-center gap-1 group-hover:text-[#D4AF37] group-hover:italic transition-all duration-500">
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

      <div ref={overlayRef} className="fixed inset-0 z-[60] bg-[#050505] text-[#F9F9F7] flex flex-col justify-center overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
        
        <div className="absolute top-8 left-8 md:left-16 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] flex justify-between items-center z-[70] pointer-events-auto">
          <div className="flex flex-col uppercase pointer-events-none">
            <div className="text-xl md:text-2xl font-serif tracking-[0.3em] font-light text-[#D4AF37]">DS MIAMI</div>
            <div className="text-[0.55rem] tracking-[0.4em] font-mono mt-2 opacity-50">Menu Navigation</div>
          </div>
          <button ref={closeBtnRef} onClick={() => setIsOpen(false)} className="px-6 py-3 border border-[#F9F9F7]/20 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#F9F9F7] hover:text-[#050505] transition-colors duration-300">
            CLOSE [X]
          </button>
        </div>

        <div className="relative z-20 w-full h-full px-8 md:px-16 flex flex-col md:flex-row items-start md:items-center pt-32 md:pt-0 pointer-events-none">
          <nav className="flex flex-col gap-2 w-full md:w-[50vw] pointer-events-auto z-10">
            {menuData.map((link, idx) => (
              <div key={idx} className="overflow-hidden py-2" onMouseEnter={() => setHoveredIndex(idx)}>
                <Link href={link.path} onClick={handleLinkClick} ref={el => linksRef.current[idx] = el} className="inline-block text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter hover:italic hover:text-[#D4AF37] transition-colors duration-300">
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex flex-col w-full md:w-[40vw] ml-auto mt-16 md:mt-0 h-full justify-center relative pointer-events-auto">
            
            {/* Highly Optimized Image Grid (No Unmounting/Remounting Lag) */}
            <div className="relative w-full max-w-[60vh] aspect-square mb-12 pointer-events-none mx-auto">
              {menuData.map((data, linkIdx) => (
                <div 
                  key={`grid-${linkIdx}`} 
                  className={`absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoveredIndex === linkIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'}`}
                >
                  {data.images.map((imgSrc, i) => (
                    <div key={i} className="overflow-hidden bg-[#111] aspect-square w-full h-full">
                      <Image src={imgSrc} alt="Preview" fill sizes="200px" className="object-cover grayscale mix-blend-screen opacity-60" />
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Static Crosshair Overlay */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 z-20"></div>
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20 z-20"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
            </div>

            <div className="flex justify-between items-end w-full">
              <nav className="flex flex-col gap-2">
                {subLinks.map((link, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <Link href={link.path} onClick={handleLinkClick} ref={el => subLinksRef.current[idx] = el} className="text-xl md:text-2xl font-serif uppercase opacity-70 hover:opacity-100 hover:text-[#D4AF37] transition-colors block">{link.name}</Link>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-2 font-mono text-[0.55rem] tracking-widest uppercase opacity-50 text-right">
                <a href="mailto:info@designsolutionsmiami.com" className="hover:text-[#D4AF37]">hello@designsolutions.com</a>
                <a href="tel:+17862244923" className="hover:text-[#D4AF37]">+1 (786) 224-4923</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}