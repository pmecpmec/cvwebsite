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
      variants={stagger(0.1)}
      className="mb-16"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-sm text-accent tracking-wider uppercase"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-zinc-400 max-w-xl text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
