import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

export default function Studio() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen w-full bg-[#F9F9F7] text-[#0C0F12] pt-48 px-8 md:px-16 pb-24">
        <h1 className="text-[12vw] font-serif leading-none tracking-tighter uppercase mb-16">
          Our <span className="italic text-[#C5A880]">Studio</span>
        </h1>
        <div className="w-full h-[70vh] bg-[#0C0F12]/10 flex items-center justify-center opacity-50">
           <p className="font-mono text-xs tracking-widest uppercase">Studio Imagery Coming Soon</p>
        </div>
      </main>
    </SmoothScroll>
  );
}