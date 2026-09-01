'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import soundEngine from '@/lib/SoundEngine';

const searchData = [
  { term: "Gran Paraiso", path: "/archive" },
  { term: "Asia Brickell Key", path: "/archive" },
  { empty: false, term: "Brickell Architecture", path: "/news" },
  { empty: false, term: "Awards & Recognition", path: "/awards" },
  { empty: false, term: "Contact the Studio", path: "/contact" },
  { empty: false, term: "Tropical Modernism", path: "/news" },
  { empty: false, term: "Interior Lighting", path: "/services" },
  { empty: false, term: "Consultation", path: "/contact" }
];

export default function MenuSearch({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  
  const filtered = query.length > 0 
    ? searchData.filter(item => item.term.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelect = (path) => {
    soundEngine.playDeepThud();
    onNavigate();
    setTimeout(() => router.push(path), 600);
  };

  return (
    <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 w-full max-w-[85vw] md:max-w-md pointer-events-auto z-50">
      <div className={`relative flex items-center border-b transition-colors duration-500 ${isFocused ? 'border-[#C5A880]' : 'border-white/20'}`}>
        <svg className="w-4 h-4 text-white/50 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search projects, news, or services..."
          className="w-full bg-transparent py-3 text-sm md:text-base font-sans tracking-wide text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>

      <AnimatePresence>
        {filtered.length > 0 && isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-2 bg-[#0C0F12]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-y-auto max-h-[45vh] md:max-h-72 shadow-2xl"
          >
            {filtered.map((item, idx) => (
              <button 
                key={idx}
                onMouseEnter={() => soundEngine.playSoftClick()}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors group flex items-center justify-between"
              >
                <span className="font-serif text-white/80 group-hover:text-[#C5A880] transition-colors">{item.term}</span>
                <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Enter</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}