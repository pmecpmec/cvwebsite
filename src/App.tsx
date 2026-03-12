import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ClickSpark from './components/ui/ClickSpark';
import TargetCursor from './components/ui/TargetCursor';
import CommandPalette from './components/ui/CommandPalette';
import ColorBends from './components/ui/ColorBends';
import EasterEggIndicator from './components/ui/EasterEggIndicator';
import { MakeoverProvider, useMakeover } from './context/MakeoverContext';
import { TechFilterProvider } from './context/TechFilterContext';

function AppContent() {
  const appRef = useRef<HTMLDivElement>(null);
  const { isMakeover } = useMakeover();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ClickSpark sparkColor="#C4723A" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div ref={appRef} className="relative min-h-screen w-full cursor-none [&_*]:!cursor-none">
        {/* ColorBends full-page background - only in makeover mode */}
        {isMakeover && (
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <ColorBends
              colors={['#2c2418', '#4a3528', '#C4723A', '#e8956a', '#f0a878']}
              rotation={45}
              speed={0.2}
              scale={1}
              frequency={1.5}
              warpStrength={1}
              mouseInfluence={0.8}
              parallax={0.5}
              noise={0.03}
              transparent
            />
          </div>
        )}
        <div className="relative" style={{ zIndex: 10 }}>
          <TargetCursor containerRef={appRef} />
          <CommandPalette />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>

        <EasterEggIndicator />
      </div>
    </ClickSpark>
  );
}

export default function App() {
  return (
    <MakeoverProvider>
      <TechFilterProvider>
        <AppContent />
      </TechFilterProvider>
    </MakeoverProvider>
  );
}
