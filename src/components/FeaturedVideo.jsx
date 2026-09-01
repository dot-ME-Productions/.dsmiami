export default function FeaturedVideo() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#F9F9F7] text-[#0C0F12] border-t border-black/10 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Video Embed */}
        <div className="w-full lg:w-1/2 aspect-video relative rounded-sm overflow-hidden shadow-2xl group cursor-pointer bg-black/5">
          {/* Replace src later when scraper gets the actual YouTube ID */}
          <iframe 
            className="w-full h-full absolute inset-0 z-10" 
            src="https://www.youtube.com/embed/tLJYAz7pD2c?rel=0&modestbranding=1" 
            title="SoFlo Home Project Episode" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8">
            SoFlo Home Project Episode with Luciana Fragali & David Siddons
          </h2>
          <div className="flex flex-col gap-6 font-sans text-sm md:text-base text-black/70 leading-relaxed font-light">
            <p>
              Luciana and David welcomed the SoFlo Home Project into their home, where they shared how modern design can be both sleek and inviting.
            </p>
            <p>
              Their conversation highlighted how thoughtful details and warm touches prove that modern living doesn&apos;t have to feel cold.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}