'use client';
import soundEngine from '@/lib/SoundEngine';

export default function BookConsultationBtn() {
  return (
    <a 
      href="https://calendly.com/" 
      target="_blank" 
      rel="noopener noreferrer" 
      onMouseEnter={() => soundEngine.playActionSwell()} 
      onClick={() => soundEngine.playDeepThud()}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[80] bg-[#C5A880] text-[#0C0F12] px-6 py-4 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#F9F9F7] hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2 group"
    >
      <span>Book Consultation</span>
      <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
    </a>
  );
}