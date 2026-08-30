'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Philosophy from '@/components/Philosophy';
import NextGenFooter from '@/components/NextGenFooter';
import AwardsMarquee from '@/components/AwardsMarquee';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);

  useGSAP(() => {
    // Dynamic Background Color Shift (Black to Cream)
    gsap.to(mainRef.current, {
      backgroundColor: "#F9F9F7",
      color: "#050505",
      scrollTrigger: {
        trigger: "#philosophy-target",
        start: "top 60%",
        end: "top 20%",
        scrub: true,
      }
    });
  }, { scope: mainRef });

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      
      {/* Film Grain Noise Global Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <main ref={mainRef} className="relative bg-[#050505] text-[#F9F9F7]">
        <Navigation />
        <div id="hero-target"><Hero /></div>
        
        <Showcase />
        
        {/* Anchor for Skip Button and Background Color trigger */}
        <div id="philosophy-target">
          <Philosophy />
        </div>
        
        <AwardsMarquee />
        <NextGenFooter />
      </main>
    </SmoothScroll>
  );
}