import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Props {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ label, title, description }: Props) {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={stagger(0.12)}
      className="mb-16"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs text-accent tracking-widest uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-serif text-4xl sm:text-5xl text-warm-900 tracking-tight italic"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-warm-600 max-w-lg text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
