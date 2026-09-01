import BookConsultationBtn from '@/components/BookConsultationBtn';
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
        url: "https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-living-room-figurative-art-glass-shelving.webp",
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
    images: ["https://ds-miami.com/wp-content/uploads/2026/06/asia-brickell-key-living-room-figurative-art-glass-shelving.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="overflow-x-hidden bg-[#0C0F12] text-[#F9F9F7] font-sans antialiased selection:bg-[#C5A880] selection:text-[#0C0F12] overflow-x-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A880]">
        <CinematicBackground />
        {children}
                
        
        {/* DeepSeek Flaw #3: Lead Capture Mechanism */}
        <BookConsultationBtn />
      </body>
    </html>
  );
}