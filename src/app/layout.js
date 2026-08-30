import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
      <body suppressHydrationWarning className="bg-[#050505] text-[#F9F9F7] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#050505] overflow-x-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
        {children}
      </body>
    </html>
  );
}