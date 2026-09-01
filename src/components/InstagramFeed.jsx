import Image from 'next/image';
import Link from 'next/link';

export default function InstagramFeed() {
  // Placeholder images until scraper returns the real ones
  const posts = [
    "https://ds-miami.com/wp-content/uploads/2026/06/new-build-cocoplum-home-living-tv-sectional.webp",
    "https://ds-miami.com/wp-content/uploads/2026/06/continuum-south-beach-master-bedroom-neutral-tones-black-lamps.webp",
    "https://ds-miami.com/wp-content/uploads/2026/05/luxury-condo-living-room-waterfront-view-miami-scaled.webp",
    "https://ds-miami.com/wp-content/uploads/2026/06/great-room-round-mirror-suede-armchairs-gallery-wall-scaled.webp"
  ];

  return (
    <section className="w-full py-24 bg-[#F9F9F7] text-[#0C0F12] border-t border-black/10 relative z-20">
      <div className="w-full flex flex-col items-center">
        
        <Link href="https://instagram.com/designsolutionsmiami" target="_blank" className="flex items-center gap-4 mb-16 hover:opacity-70 transition-opacity">
          {/* Simple SVG Instagram Icon */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <h3 className="text-2xl md:text-3xl font-serif">
            Follow us <span className="text-[#967756] italic">@designsolutionsmiami</span>
          </h3>
        </Link>

        {/* 4-column Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 px-2">
          {posts.map((url, i) => (
            <Link href="https://instagram.com/designsolutionsmiami" target="_blank" key={i} className="relative aspect-square overflow-hidden group">
              <Image 
                src={url} 
                alt="Instagram Post" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Hover overlay with icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4-8.5l-6 3.5v-7l6 3.5z"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}