&apos;use client&apos;;
import { useRef, useEffect } from &apos;react&apos;;
import Link from &apos;next/link&apos;;
import gsap from &apos;gsap&apos;;
import { ScrollTrigger } from &apos;gsap/ScrollTrigger&apos;;
import { useGSAP } from &apos;@gsap/react&apos;;

gsap.registerPlugin(ScrollTrigger);

export default function Section5() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const btnRef = useRef(null);
  const btnTextRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(text1Ref.current, { xPercent: -20 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo(text2Ref.current, { xPercent: 20 }, { xPercent: -10, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: containerRef });

  useEffect(() => {
    const btn = btnRef.current;
    const btnText = btnTextRef.current;
    if(!btn || !btnText) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Reduced magnetism for smoother feel
      gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.5, ease: "power2.out" });
      gsap.to(btnText, { x: x * 0.1, y: y * 0.1, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      gsap.to(btnText, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, []);

  return (
    <footer ref={containerRef} className="h-screen w-full bg-[#050505] text-[#F9F9F7] flex flex-col items-center justify-center relative overflow-hidden border-t border-[#F9F9F7]/10 cursor-none">
      
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none w-[120vw] -left-[10vw]">
        <h1 ref={text1Ref} className="text-[25vw] font-serif leading-none tracking-tighter w-full text-center">LET&apos;S</h1>
        <h1 ref={text2Ref} className="text-[25vw] font-serif leading-none tracking-tighter -mt-[10vw] text-[#D4AF37] w-full text-center">TALK</h1>
      </div>
      
      <div className="z-10 text-center flex flex-col items-center gap-12 mt-16 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-serif max-w-xl leading-tight">
          Ready to elevate your space into a <span className="italic text-[#D4AF37]">masterpiece?</span>
        </h2>
        
        <Link 
          href="/contact" 
          ref={btnRef}
          className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#F9F9F7]/30 flex items-center justify-center pointer-events-auto hover:bg-[#F9F9F7] hover:border-transparent group transition-colors duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-100 rounded-full transition-all duration-700 blur-xl"></div>
          <span ref={btnTextRef} className="font-mono text-xs tracking-widest uppercase group-hover:text-[#050505] transition-colors duration-500 z-10 font-bold">
            Start Project
          </span>
        </Link>
      </div>
      
      <div className="absolute bottom-0 w-full px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.55rem] tracking-widest font-mono uppercase opacity-50 z-20">
        <div className="flex gap-8">
          <span>Â© 2026 DESIGN SOLUTIONS MIAMI</span>
        </div>
        <div className="flex gap-8 pointer-events-auto">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">LINKEDIN</a>
        </div>
        <div>
          <span>MADE BY <span className="text-[#D4AF37]">.ME PRODUCTIONS</span></span>
        </div>
      </div>
    </footer>
  );
}