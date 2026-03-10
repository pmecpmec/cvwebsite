import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

const word = {
  hidden: { opacity: 0, y: 40, rotateX: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedWords({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={word}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.3em]"
          style={{ perspective: 400 }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm ambient shapes */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[15%] w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-32 left-[10%] w-[400px] h-[400px] bg-orange-300/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-200/[0.08] rounded-full blur-[80px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="section-container relative z-10 py-32 md:py-40">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-sm text-accent tracking-wider mb-8"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '2.5rem' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block h-px bg-accent align-middle mr-4"
          />
          hey there, I'm Pedro
        </motion.p>

        <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.05] text-warm-900 tracking-tight">
          <AnimatedWords text="I build things" />
          <AnimatedWords
            text="for the web"
            className="gradient-text"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg sm:text-xl text-warm-600 max-w-md leading-relaxed"
        >
          Software developer crafting clean, expressive
          digital experiences from Amsterdam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-warm-900 hover:bg-warm-800 text-cream-100 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
          >
            See my work
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-warm-700 border border-warm-900/15 rounded-full hover:border-warm-900/30 hover:text-warm-900 transition-all duration-300"
          >
            Let's talk
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-9 border border-warm-900/20 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-warm-900/30 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
