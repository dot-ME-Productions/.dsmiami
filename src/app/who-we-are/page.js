'use client';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import NextGenFooter from '@/components/NextGenFooter';

export default function Page() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main className="w-full min-h-screen pt-32 px-8 md:px-16 flex items-center justify-center bg-transparent">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-serif text-[#F9F9F7] uppercase tracking-tighter text-center"
        >
          Coming <span className="text-[#C5A880] italic">Soon</span>
        </motion.h1>
      </main>
      <NextGenFooter />
    </SmoothScroll>
  );
}