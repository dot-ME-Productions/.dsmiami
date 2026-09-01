export default function PressLogos() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#0C0F12] border-t border-white/5 relative z-20">
      <div className="w-full flex flex-col items-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-16 text-center">
          Honoured to be featured in international design
        </p>
        
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          
          {/* AD (Architectural Digest) */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-5xl md:text-6xl tracking-tighter leading-none">AD</span>
            <span className="font-sans text-[6px] tracking-widest uppercase mt-1">Architectural Digest</span>
          </div>

          {/* INSIDER */}
          <div className="font-sans font-bold text-2xl md:text-3xl tracking-tight uppercase">
            Insider
          </div>

          {/* HAUTE RESIDENCE */}
          <div className="flex flex-col items-center">
            <span className="font-serif italic text-2xl md:text-3xl tracking-tight">Haute</span>
            <span className="font-sans text-[8px] tracking-[0.2em] uppercase">Residence</span>
          </div>

          {/* ELLE DECOR */}
          <div className="font-serif text-2xl md:text-3xl tracking-widest uppercase">
            Elle<span className="opacity-50">Decor</span>
          </div>

          {/* Forbes */}
          <div className="font-serif font-bold text-3xl md:text-4xl tracking-tighter capitalize">
            Forbes
          </div>

        </div>
      </div>
    </section>
  );
}