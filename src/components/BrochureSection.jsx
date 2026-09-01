'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function BrochureSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = 'DS_Miami_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after brief delay
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '' });
    }, 2000);
  };

  return (
    <>
      <section className="w-full py-32 bg-[#F4F0EA] text-[#0C0F12] relative z-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Mockup Image */}
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="https://ds-miami.com/wp-content/uploads/2026/06/ds-bayview-dining-room-city-view.webp" 
              alt="Design Solutions Brochure"
              fill
              className="object-cover"
            />
            {/* Elegant overlay to mimic printed book */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center pointer-events-none">
                <div className="border border-white/30 p-8 backdrop-blur-sm bg-black/10">
                    <h3 className="font-serif text-white text-3xl mb-2">DS MIAMI</h3>
                    <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/70">The Master Portfolio</p>
                </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-none mb-6">
              The Master<br/>Design Brochure
            </h2>
            <p className="font-light text-black/60 text-base md:text-lg max-w-md mb-12 leading-relaxed">
              Download the Design Solutions master brochure to experience the craftsmanship, philosophy, and architectural vision behind our most iconic projects.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-[#0C0F12] text-[#F4F0EA] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-[#C5A880] hover:text-[#0C0F12] transition-colors duration-300"
            >
              Access Now
            </button>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-[#0C0F12] border border-white/10 p-8 md:p-12 max-w-md w-full shadow-2xl rounded-sm z-10 text-[#F9F9F7]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-white/50 hover:text-white uppercase"
            >
              Close
            </button>
            
            {!isSubmitted ? (
              <>
                <h3 className="text-3xl font-serif mb-2">Access the Archive</h3>
                <p className="font-light text-white/50 text-sm mb-8">Please provide your details to download the digital brochure.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#C5A880] transition-colors font-light placeholder:text-white/30"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address (Gmail preferred)" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#C5A880] transition-colors font-light placeholder:text-white/30"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#C5A880] transition-colors font-light placeholder:text-white/30"
                  />
                  <button 
                    type="submit"
                    className="mt-4 w-full py-4 bg-[#C5A880] text-[#0C0F12] font-mono text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
                  >
                    Download Brochure
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-[#C5A880] flex items-center justify-center mb-6 text-[#C5A880] text-2xl">
                  &#10003;
                </div>
                <h3 className="text-2xl font-serif mb-2">Thank You</h3>
                <p className="font-light text-white/50 text-sm">Your download will begin immediately.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}