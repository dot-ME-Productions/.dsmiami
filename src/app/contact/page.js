'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

function LiveClock({ timeZone, label }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
      setTime(`${formattedTime} ${label}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone, label]);

  return <span className="font-mono text-sm tracking-widest text-[#D4AF37] tabular-nums">{time || '00:00:00 ...'}</span>;
}

export default function Contact() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen w-full bg-[#050505] text-[#F9F9F7] flex flex-col pt-32 pb-24 px-8 md:px-16 lg:px-24">
        
        <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-24 lg:gap-32 mt-16">
          
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <form className="w-full flex flex-col gap-12">
              
              <div className="flex flex-col gap-4">
                <label className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/50">
                  What is your name?
                </label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-3xl font-serif text-[#F9F9F7] placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/50">
                  What is your email?
                </label>
                <input 
                  type="email" 
                  placeholder="john@company.com"
                  className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-3xl font-serif text-[#F9F9F7] placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/50">
                  Tell us about the project
                </label>
                <textarea 
                  placeholder="We want to build something extraordinary..."
                  rows="3"
                  className="w-full bg-transparent border-b border-white/10 pb-4 text-2xl md:text-3xl font-serif text-[#F9F9F7] placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="mt-8">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#D4AF37] text-[#050505] px-10 py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#F9F9F7] transition-colors duration-300"
                >
                  Submit Inquiry
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </motion.button>
              </div>

            </form>
          </motion.div>

          {/* Right Column: Global Offices */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[40%] flex flex-col"
          >
            <h3 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/50 border-b border-white/10 pb-4 mb-8">
              Global Offices
            </h3>

            <div className="flex flex-col gap-12">
              
              {/* Office 1 */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/10 pb-8 gap-4 group">
                <div className="flex flex-col">
                  <h4 className="text-xl md:text-2xl font-bold uppercase mb-2">Miami HQ</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    Miami Design District<br/>
                    FL 33137, USA
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Miami+Design+District" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity uppercase"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Open in Maps
                  </a>
                </div>
                <LiveClock timeZone="America/New_York" label="EST" />
              </div>

            </div>
          </motion.div>

        </div>
      </main>
    </SmoothScroll>
  );
}