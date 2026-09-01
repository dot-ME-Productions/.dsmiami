export default function CinematicBackground() {
  return (
    <>
      {/* BACKGROUND LAYER: Cinematic Ambient Lighting */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        
        {/* 1. Champagne Gold Ambient Glow (Top Left) */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#C5A880]/20 blur-[150px] mix-blend-screen opacity-90 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* 2. Deep Midnight Blue Ambient Glow (Bottom Right) */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#1A2840]/50 blur-[160px] mix-blend-screen opacity-100 animate-pulse" style={{ animationDuration: '12s' }}></div>

        {/* 3. Subtle Center Accent */}
        <div className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#C5A880]/10 blur-[140px] mix-blend-screen opacity-70"></div>
      </div>

      {/* FOREGROUND LAYER: Film Grain & Architectural Grid */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden">
        
        {/* 4. Fine Film Grain Texture (Using highly optimized SVG Noise) - Reduced Opacity per User Request */}
        <div 
          className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>

        {/* 5. Subtle Architectural Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(249,249,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,249,247,1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>
    </>
  );
}