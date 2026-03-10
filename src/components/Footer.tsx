import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Rocket } from 'lucide-react';
import { socials } from '@/data/social';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={17} />,
  linkedin: <Linkedin size={17} />,
  mail: <Mail size={17} />,
};

export default function Footer() {
  const [showRocket, setShowRocket] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      setShowRocket(nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const launch = useCallback(() => {
    setLaunching(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
    setTimeout(() => {
      setLaunching(false);
    }, 1200);
  }, []);

  return (
    <footer className="relative border-t border-warm-900/[0.06] py-12">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-warm-600">
          <span className="font-mono">&copy; {new Date().getFullYear()}</span>{' '}
          Pedro Eduardo Cardoso
        </p>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-warm-600 hover:text-accent transition-colors"
            >
              {iconMap[s.icon]}
            </a>
          ))}
        </div>

        <p className="text-[11px] text-cream-500 font-mono tracking-wider">
          react + framer motion
        </p>
      </div>

      <AnimatePresence>
        {showRocket && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={launch}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 group"
          >
            <motion.div
              animate={
                launching
                  ? { y: [0, -10, -800], opacity: [1, 1, 0], scale: [1, 1.15, 0.6] }
                  : { y: 0, opacity: 1, scale: 1 }
              }
              transition={
                launching
                  ? { duration: 0.8, ease: [0.36, 0, 0.66, -0.56], times: [0, 0.15, 1] }
                  : { duration: 0.3 }
              }
              className="relative"
            >
              <div className="relative flex items-center justify-center w-12 h-12 bg-warm-900 hover:bg-warm-800 text-cream-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Rocket
                  size={18}
                  className="rotate-[-45deg] group-hover:-translate-y-0.5 transition-transform"
                />
              </div>

              {/* Flame trail when launching */}
              <AnimatePresence>
                {launching && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 1, 1], scaleY: [0, 1, 2.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-8 origin-top"
                  >
                    <div className="w-full h-full bg-gradient-to-b from-accent via-orange-400 to-transparent rounded-full blur-[3px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 text-[11px] font-mono text-warm-700 bg-cream-100 border border-warm-900/10 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              blast off!
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
