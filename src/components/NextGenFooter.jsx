'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import soundEngine from '@/lib/SoundEngine';

gsap.registerPlugin(ScrollTrigger);

export default function NextGenFooter() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(contentRef.current, 
      { yPercent: -50, scale: 0.9 },
      {
        yPercent: 0, scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    // Insane Magnetic Button Physics
    const btn = buttonRef.current;
    const txt = textRef.current;
    if(!btn || !txt) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull button towards mouse
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
      // Pull text inside button EVEN MORE for massive parallax depth
      gsap.to(txt, { x: x * 0.15, y: y * 0.15, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => { 
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); 
      gsap.to(txt, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" }); 
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => { btn.removeEventListener("mousemove", handleMouseMove); btn.removeEventListener("mouseleave", handleMouseLeave); }
  }, []);

  return (
    <footer ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end z-0 bg-[#0C0F12]">
      
      <div ref={contentRef} className="w-full h-full flex flex-col justify-between p-8 md:p-16">
        
        <div className="flex justify-between items-start mt-32">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-4xl md:text-6xl uppercase tracking-widest text-[#C5A880]">
              COMMISSION A PROJECT
            </h3>
            <a href="mailto:hello@designsolutions.com" className="font-mono text-sm tracking-[0.2em] text-white hover:text-[#C5A880] transition-colors">
              hello@designsolutions.com
            </a>
            <a href="tel:+17862244923" className="font-mono text-sm tracking-[0.2em] text-white hover:text-[#C5A880] transition-colors">
              +1 786 224 4923
            </a>
          </div>

          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest uppercase items-end text-white/50">
            <p className="mb-2">Miami</p>
            
            <a href="https://instagram.com/designsolutionsmiami" target="_blank" className="flex items-center gap-3 hover:text-[#C5A880] transition-colors group">
              <span>Instagram</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            
            <a href="https://www.pinterest.com/dsmiami/" target="_blank" className="flex items-center gap-3 hover:text-[#C5A880] transition-colors group">
              <span>Pinterest</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
            </a>
            
            <a href="https://www.houzz.com/pro/designsolutionsmiami" target="_blank" className="flex items-center gap-3 hover:text-[#C5A880] transition-colors group">
              <span>Houzz</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M1.27 0v7.187h7.117V0H1.27zm7.117 7.187v7.186h7.119V7.187H8.387zm7.119 0v7.186h7.117V7.187h-7.117zM8.387 14.373v7.187h7.119v-7.187H8.387z"/></svg>
            </a>
            
            <a href="https://www.facebook.com/designsolutionsmiami" target="_blank" className="flex items-center gap-3 hover:text-[#C5A880] transition-colors group">
              <span>Facebook</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center my-12">
          <Link href="/contact" ref={buttonRef} onMouseEnter={() => soundEngine.playHoverChime()} onClick={() => soundEngine.playDeepThud()} className="group relative inline-flex items-center justify-center px-24 py-12 border border-[#C5A880] rounded-full overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[#C5A880] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            <span ref={textRef} className="relative z-10 font-serif text-3xl tracking-[0.2em] text-[#C5A880] group-hover:text-[#0C0F12] uppercase transition-colors duration-500 pointer-events-none">
              INITIATE
            </span>
          </Link>
        </div>

        <div className="w-full text-center">
          <h1 className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter uppercase whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700 text-white">
            DS MIAMI
          </h1>
        </div>

      </div>
    </footer>
  );
}