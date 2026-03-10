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

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

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
      <div ref={appRef} className="min-h-screen cursor-none [&_*]:!cursor-none">
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
    </ClickSpark>
  );
}
