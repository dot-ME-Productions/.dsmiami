import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CinematicBackground from '@/components/CinematicBackground';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "DS Miami | Turnkey Luxury Interior Design & Architecture",
  description: "We do not decorate spaces, we architect atmospheres. DS Miami delivers turnkey luxury interior design, bespoke furnishings, and lighting design.",
  openGraph: {
    title: "DS Miami | Luxury Interiors",
    description: "Turnkey luxury interior design and architecture solutions.",
    url: "https://ds-miami.vercel.app",
    siteName: "DS Miami",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "DS Miami Luxury Architecture",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Miami | Luxury Interiors",
    description: "Turnkey luxury interior design and architecture solutions.",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="overflow-x-hidden bg-[#0C0F12] text-[#F9F9F7] font-sans antialiased selection:bg-[#C5A880] selection:text-[#0C0F12] overflow-x-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A880]">
        <CinematicBackground />
        {children}
                
        
        {/* DeepSeek Flaw #3: Lead Capture Mechanism */}
        <a 
          href="https://calendly.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[80] bg-[#C5A880] text-[#0C0F12] px-6 py-4 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#F9F9F7] hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2 group"
        >
          <span>Book Consultation</span>
          <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
        </a>
      </body>
    </html>
  );
}