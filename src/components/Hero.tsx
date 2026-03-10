import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.025, delayChildren: 0.4 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedLine({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.span className={`block ${className}`} variants={sentence} initial="hidden" animate="visible">
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-sm text-accent mb-6 tracking-wider"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '2rem' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block h-px bg-accent align-middle mr-3"
          />
          hello, I'm
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
          <AnimatedLine text="Pedro" />
          <AnimatedLine text="Campos" className="gradient-text" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-lg leading-relaxed"
        >
          Software developer building clean, performant,
          <br className="hidden sm:block" />
          and expressive digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-xl transition-all hover:shadow-[0_0_24px_rgba(124,58,237,0.3)]"
          >
            View my work
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-300 border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-all"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <motion.div className="w-1 h-1.5 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
