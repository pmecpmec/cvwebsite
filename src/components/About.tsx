import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef } from 'react';
import SectionHeading from './ui/SectionHeading';
import StarBorder from './ui/StarBorder';
import { useMakeover } from '@/context/MakeoverContext';

const HINT_STORAGE_KEY = 'frontendHintDismissed';

export default function About() {
  const { ref, controls } = useScrollReveal();
  const imgRef = useRef<HTMLDivElement>(null);
  const { isMakeover, toggleMakeover } = useMakeover();
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(HINT_STORAGE_KEY)) {
      setHintDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  const handleEasterEggClick = () => {
    toggleMakeover();
    localStorage.setItem(HINT_STORAGE_KEY, 'true');
    setHintDismissed(true);
    setShowHint(false);
  };

  const handleShowHint = () => {
    if (!hintDismissed) setShowHint(true);
  };

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-32 relative z-10">
      <div className="section-container">
        <SectionHeading label="01 / About" title="A bit about me" center />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
        >
          {/* Photo - image always in DOM, StarBorder as overlay when active */}
          <motion.div
            ref={imgRef}
            variants={fadeUp}
            className="relative group max-w-3xl mx-auto mb-14 z-10"
          >
            {/* StarBorder overlay - only when makeover mode, Tailwind animate */}
            {isMakeover && (
              <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-visible animate-fade-in">
                <StarBorder className="w-full h-full" />
              </div>
            )}

            {/* Image - ALWAYS present */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src="/image/background.jpg"
                alt="Pedro Eduardo Cardoso"
                className="w-full h-[130%] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text underneath */}
          <motion.div variants={stagger(0.1)} className="max-w-2xl mx-auto space-y-5">
            <motion.p variants={fadeUp} className="text-warm-800 text-lg leading-relaxed">
              I'm Pedro, 24, currently living in Amsterdam and studying Software Development at Windesheim in Almere. Originally born in Portugal, my curiosity for technology started early. From playing on a Game Boy as a kid to experimenting with modern development tools today, I've always been fascinated by how technology works and how it can be built.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-800 text-lg leading-relaxed">
              I'm especially drawn to{' '}
              <button
                type="button"
                onClick={handleEasterEggClick}
                onMouseEnter={handleShowHint}
                onMouseLeave={() => setShowHint(false)}
                onTouchStart={handleShowHint}
                onFocus={handleShowHint}
                onBlur={() => setShowHint(false)}
                className="relative inline-block text-warm-900 font-medium cursor-pointer group/fe focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                aria-label={isMakeover ? 'Revert to normal view' : 'Toggle front-end mode (Easter egg)'}
              >
                <span className="relative inline-block z-10 text-skill-accent hover:text-accent transition-colors duration-300 border-b-2 border-skill-accent/30 hover:border-accent/50">
                  front-end development
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          y: -5,
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 10px 25px -5px rgba(255, 107, 53, 0.08)',
                            '0 10px 30px -5px rgba(255, 107, 53, 0.2)',
                            '0 10px 25px -5px rgba(255, 107, 53, 0.08)',
                          ],
                        }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{
                          type: 'spring',
                          damping: 15,
                          stiffness: 300,
                          scale: {
                            repeat: Infinity,
                            duration: 1.5,
                            ease: 'easeInOut',
                          },
                          boxShadow: {
                            repeat: Infinity,
                            duration: 1.5,
                            ease: 'easeInOut',
                          },
                        }}
                        className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-cream-200 text-warm-700 text-xs font-mono rounded-lg shadow-lg border border-skill-accent/30 whitespace-nowrap pointer-events-none z-50"
                      >
                        ✨ Click me!
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cream-200 rotate-45 border-r border-b border-skill-accent/30" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              </button>{' '}
              because I enjoy seeing ideas come to life in the browser. Building interfaces that feel smooth, responsive, and intentional is something I genuinely enjoy.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              I'm naturally curious and persistent. When something doesn't work, I keep digging until I understand it. That mindset pushes me to continuously improve, both as a developer and as a person.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              Outside of coding you'll usually find me in the gym, playing competitive games like Counter-Strike, or exploring new technologies and tools.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm"
            >
              {[
                ['Location', 'Amsterdam'],
                ['Education', 'Windesheim'],
                ['Focus', 'Full-Stack'],
                ['Interests', 'Fitness · Gaming'],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="font-mono text-[11px] text-accent uppercase tracking-widest">
                    {label}
                  </span>
                  <p className="mt-1.5 text-warm-800 font-medium">{value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
