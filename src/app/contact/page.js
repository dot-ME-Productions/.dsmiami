'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

function LiveClock({ timeZone, label }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now) + ` ${label}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone, label]);
  return <span className="font-mono text-sm tracking-widest text-[#D4AF37] tabular-nums">{time || '00:00:00 ...'}</span>;
}

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: '', budget: '', name: '', email: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => setStep(prev => prev + 1), 300); // Auto-advance smoothly
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen w-full bg-[#050505] text-[#F9F9F7] flex flex-col pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-32 mt-8 md:mt-16">
          
          {/* Left Column: Concierge Form */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-[60vh] relative">
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter mb-4">Start a Dialogue</h1>
            <p className="font-light text-white/50 text-sm md:text-base max-w-md mb-16">
              Our intake process ensures we only engage with projects where we can deliver absolute, uncompromising value.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col flex-1"
                >
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#D4AF37]">01 / Project Category</p>
                      <h2 className="text-2xl font-serif mb-8">What is the nature of your space?</h2>
                      {['Residential Estate', 'Commercial HQ', 'Luxury Hospitality'].map(type => (
                        <button 
                          key={type}
                          onClick={() => handleSelection('type', type)}
                          className="w-full text-left p-6 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group flex justify-between items-center"
                        >
                          <span className="font-serif text-xl tracking-tight">{type}</span>
                          <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">&#8594;</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="flex flex-col gap-6">
                      <button onClick={() => setStep(1)} className="text-left font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white mb-4">&#8592; Back</button>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#D4AF37]">02 / Investment</p>
                      <h2 className="text-2xl font-serif mb-8">What is your anticipated design budget?</h2>
                      {['$250k - $500k', '$500k - $2M', '$2M - $5M', '$5M+ (Turnkey Legacy)'].map(budget => (
                        <button 
                          key={budget}
                          onClick={() => handleSelection('budget', budget)}
                          className="w-full text-left p-6 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group flex justify-between items-center"
                        >
                          <span className="font-serif text-xl tracking-tight">{budget}</span>
                          <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">&#8594;</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                      <button type="button" onClick={() => setStep(2)} className="text-left font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white mb-4 w-fit">&#8592; Back</button>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#D4AF37]">03 / The Details</p>
                      
                      <div className="relative border-b border-white/20 pb-2">
                        <input type="text" required placeholder=" " className="peer w-full bg-transparent outline-none text-xl font-serif pt-4 pb-2 text-white placeholder-transparent focus:border-[#D4AF37]" />
                        <label className="absolute left-0 top-0 text-white/40 font-mono text-xs tracking-widest uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-serif peer-focus:top-0 peer-focus:text-xs peer-focus:font-mono peer-focus:text-[#D4AF37]">Full Name</label>
                      </div>

                      <div className="relative border-b border-white/20 pb-2">
                        <input type="email" required placeholder=" " className="peer w-full bg-transparent outline-none text-xl font-serif pt-4 pb-2 text-white placeholder-transparent focus:border-[#D4AF37]" />
                        <label className="absolute left-0 top-0 text-white/40 font-mono text-xs tracking-widest uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-serif peer-focus:top-0 peer-focus:text-xs peer-focus:font-mono peer-focus:text-[#D4AF37]">Email Address</label>
                      </div>

                      <div className="relative border-b border-white/20 pb-2 mt-4">
                        <textarea required rows="3" placeholder=" " className="peer w-full bg-transparent outline-none text-xl font-serif pt-4 pb-2 text-white placeholder-transparent focus:border-[#D4AF37] resize-none"></textarea>
                        <label className="absolute left-0 top-0 text-white/40 font-mono text-xs tracking-widest uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-serif peer-focus:top-0 peer-focus:text-xs peer-focus:font-mono peer-focus:text-[#D4AF37]">Briefly describe your vision</label>
                      </div>

                      <button type="submit" className="mt-8 w-fit flex items-center justify-center p-8 bg-[#D4AF37] text-black font-mono text-xs tracking-widest uppercase rounded-full hover:scale-105 transition-transform">
                        Submit Inquiry
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-1 text-center py-20 border border-white/10"
                >
                  <p className="font-mono text-xs tracking-widest text-[#D4AF37] mb-6">TRANSMISSION RECEIVED</p>
                  <h2 className="text-3xl font-serif mb-6">We will review your brief.</h2>
                  <p className="text-white/50 font-light max-w-sm">Our principal team will reach out within 24 hours to schedule your private consultation.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Global Presence */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full lg:w-[35%] flex flex-col gap-16 lg:pl-16 lg:border-l border-white/10"
          >
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-6">Global Headquarters</p>
              <h3 className="text-2xl font-serif mb-2">Miami, Florida</h3>
              <p className="font-light text-white/60 text-sm leading-relaxed mb-6">
                1000 Brickell Avenue<br/>
                Suite 5500<br/>
                Miami, FL 33131
              </p>
              <LiveClock timeZone="America/New_York" label="EST" />
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <a href="https://maps.google.com/?q=1000+Brickell+Ave,+Miami,+FL+33131" target="_blank" rel="noreferrer" className="inline-block border border-white/20 px-6 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                  View on Map
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-6">Direct Inquiries</p>
              <a href="mailto:info@designsolutionsmiami.com" className="block text-xl font-serif hover:text-[#D4AF37] transition-colors mb-2">
                studio@dsmiami.com
              </a>
              <a href="tel:+17862244923" className="block font-mono text-sm tracking-widest text-white/60 hover:text-white transition-colors">
                +1 (786) 224-4923
              </a>
            </div>
          </motion.div>

        </div>
      </main>
    </SmoothScroll>
  );
}