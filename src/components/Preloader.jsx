'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// A highly premium, custom-built geometric slicer and typographic scramble preloader
export default function Preloader({ setIsLoaded }) {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const [scrambleText, setScrambleText] = useState("");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const finalWord = "DS MIAMI";
    let iterations = 0;

    // Scramble Effect
    const scrambleInterval = setInterval(() => {
      setScrambleText(
        finalWord
          .split("")
          .map((letter, index) => {
            if (index < iterations) return finalWord[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= finalWord.length) clearInterval(scrambleInterval);
      iterations += 1 / 3; 
    }, 40);

    const tl = gsap.timeline({
      onComplete: () => {
        if(setIsLoaded) setIsLoaded(true);
        gsap.set(containerRef.current, { display: 'none' });
      }
    });

    // 1. Dot appears and scales up slightly
    tl.to(dotRef.current, { scale: 1, duration: 0.4, ease: "back.out(1.7)" })
    
    // 2. Dot stretches into a massive horizontal line
    .to(dotRef.current, { width: "100vw", height: "1px", borderRadius: "0%", duration: 0.8, ease: "expo.inOut" })
    
    // 3. Text fades in just above the line while scrambling finishes
    .to(textRef.current, { opacity: 1, y: -20, duration: 0.5, ease: "power2.out" }, "-=0.4")
    
    // 4. Hold for a moment to let the user read it
    .to({}, { duration: 0.8 })
    
    // 5. Text fades out, line shrinks back to a dot
    .to(textRef.current, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" })
    .to(dotRef.current, { width: "1px", height: "100vh", duration: 0.8, ease: "expo.inOut" }, "-=0.2") // Rotates into a vertical line!
    
    // 6. The massive vertical line splits the screen left and right!
    .to(dotRef.current, { opacity: 0, duration: 0.1 }) // hide line
    .to([leftDoorRef.current, rightDoorRef.current], {
      xPercent: (i) => (i === 0 ? -100 : 100), // Left goes left, Right goes right
      duration: 1.2,
      ease: "expo.inOut"
    }, "<");

    return () => {
      clearInterval(scrambleInterval);
      tl.kill();
    };
  }, [setIsLoaded]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* Split Doors for the final reveal */}
      <div ref={leftDoorRef} className="absolute top-0 left-0 w-1/2 h-full bg-[#0C0F12]"></div>
      <div ref={rightDoorRef} className="absolute top-0 right-0 w-1/2 h-full bg-[#0C0F12]"></div>

      {/* The Morphing Geometry */}
      <div 
        ref={dotRef} 
        className="absolute bg-[#C5A880] rounded-full z-10"
        style={{ width: '4px', height: '4px', scale: 0 }}
      ></div>

      {/* The Scrambling Typography */}
      <div 
        ref={textRef} 
        className="absolute z-20 font-mono text-sm tracking-[0.6em] uppercase text-[#F9F9F7] opacity-0 translate-y-0"
      >
        {scrambleText}
      </div>

    </div>
  );
}