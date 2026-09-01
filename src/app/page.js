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
import Principal from '@/components/Principal';
import Testimonial from '@/components/Testimonial';
import NextGenFooter from '@/components/NextGenFooter';
import AwardsMarquee from '@/components/AwardsMarquee';
import PressLogos from '@/components/PressLogos';
import BrochureSection from '@/components/BrochureSection';
import FeaturedVideo from '@/components/FeaturedVideo';
import InstagramFeed from '@/components/InstagramFeed';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);

  useGSAP(() => {
    // Dynamic Background Color Shift (Black to Cream)
    gsap.to(mainRef.current, {
      backgroundColor: "#F9F9F7",
      color: "#0C0F12",
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
      

      <main ref={mainRef} className="relative bg-[#0C0F12] text-[#F9F9F7]">
        <Navigation />
        <div id="hero-target"><Hero /></div>
        
        <PressLogos />
        <Showcase />
        
        {/* Anchor for Skip Button and Background Color trigger */}
        <div id="philosophy-target">
          <Philosophy />
      {/* DeepSeek Flaw #5: Team Transparency & Principal Profile */}
      <Principal />
        </div>
        
        <Testimonial />
        <FeaturedVideo />
        <InstagramFeed />
        <BrochureSection />
        <AwardsMarquee />
        <NextGenFooter />
      </main>
    </SmoothScroll>
  );
}