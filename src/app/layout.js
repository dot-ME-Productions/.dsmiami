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
  title: "DS Miami | Luxury Interior Design & Architecture",
  description: "Your vision, our expertise - a perfect harmony in design. Turnkey luxury interior design and architecture solutions in Miami.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-[#F9F9F7] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#050505] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}