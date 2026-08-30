'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function OverlayMenu({ isOpen, setIsOpen }) {
  const overlayRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { yPercent: 0, duration: 1, ease: "power4.inOut" });
      gsap.fromTo(
        linksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      );
    } else {
      gsap.to(overlayRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" });
    }
  }, [isOpen]);

  const links = [
    { name: "HOME", path: "/" },
    { name: "WHO WE ARE", path: "/who-we-are" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "MEDIA", path: "/media" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-ds-dark text-ds-light z-[100] flex flex-col justify-center px-8 md:px-32 -translate-y-full"
    >
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-8 right-8 md:top-12 md:right-16 text-sm tracking-[0.2em] uppercase hover:text-ds-gold transition-colors"
      >
        Close [X]
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full">
        <nav ref={linksRef} className="flex flex-col gap-4 md:gap-8">
          {links.map((link, idx) => (
            <div key={idx} className="overflow-hidden">
              <a 
                href={link.path}
                className="text-5xl md:text-8xl font-serif tracking-tight hover:text-ds-gold hover:italic transition-all duration-300 block"
              >
                {link.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="mt-16 md:mt-0 opacity-70 text-sm tracking-widest leading-loose">
          <p className="text-ds-gold mb-4 font-bold">MIAMI HEADQUARTERS</p>
          <p>123 Design District<br/>Miami, FL 33137</p>
          <p className="mt-4"><a href="tel:+17862244923" className="hover:text-ds-gold transition-colors">+1 786 224 4923</a></p>
          <p><a href="mailto:info@ds-miami.com" className="hover:text-ds-gold transition-colors">info@ds-miami.com</a></p>
        </div>
      </div>
    </div>
  );
}