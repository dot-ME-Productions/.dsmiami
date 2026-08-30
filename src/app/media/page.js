import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main className="w-full min-h-screen pt-32 px-8 md:px-16 bg-ds-light text-ds-dark">
        <h1 className="text-5xl md:text-8xl font-serif text-ds-dark uppercase tracking-tighter mt-16 text-center">Under <span className="text-ds-gold italic">Construction</span></h1>
      </main>
      <Footer />
    </SmoothScroll>
  );
}