import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Rocket } from 'lucide-react';
import { socials } from '@/data/social';

const DiscordIcon = () => (
  <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={17} />,
  linkedin: <Linkedin size={17} />,
  mail: <Mail size={17} />,
  discord: <DiscordIcon />,
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
