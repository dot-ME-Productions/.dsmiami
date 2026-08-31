&apos;use client&apos;;
import { useEffect, useRef } from &apos;react&apos;;
import gsap from &apos;gsap&apos;;
import { ScrollTrigger } from &apos;gsap/ScrollTrigger&apos;;

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current, 
      { yPercent: -50 }, 
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <footer id="contact" className="relative h-screen bg-ds-dark text-ds-light overflow-hidden flex flex-col justify-between pt-32 pb-16 px-8 md:px-16 clip-path-footer" style={{ clipPath: &apos;polygon(0% 0, 100% 0, 100% 100%, 0 100%)&apos; }}>
      <div ref={footerRef} className="absolute inset-0 z-0 h-full w-full flex flex-col justify-between pt-32 pb-16 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          <div>
            <h4 className="text-ds-gold tracking-widest text-sm font-bold uppercase mb-6">Contact Us</h4>
            <p className="opacity-70 leading-relaxed text-sm">+1 786 224 4923<br/>info@ds-miami.com</p>
          </div>
          <div>
            <h4 className="text-ds-gold tracking-widest text-sm font-bold uppercase mb-6">Follow Us</h4>
            <ul className="opacity-70 leading-relaxed text-sm space-y-2">
              <li><a href="https://instagram.com/designsolutionsmiami" target="_blank" className="hover:text-ds-light transition-colors">@designsolutionsmiami</a></li>
              <li><a href="#" className="hover:text-ds-light transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          <div className="md:text-right">
            <button className="border border-ds-gold text-ds-gold hover:bg-ds-gold hover:text-ds-dark transition-colors duration-300 px-8 py-4 uppercase tracking-[0.2em] text-sm">
              Let&apos;s Start a Project
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full text-center mt-auto">
          <h1 className="text-[10vw] font-serif leading-none tracking-tighter whitespace-nowrap">DESIGN <span className="italic text-ds-gold">SOLUTIONS</span></h1>
          <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-8 text-xs tracking-widest opacity-50">
            <span>Â© 2026 DS MIAMI. ALL RIGHTS RESERVED.</span>
            <span>SITE BY .ME PRODUCTIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
