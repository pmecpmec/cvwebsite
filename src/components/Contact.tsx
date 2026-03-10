import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function Contact() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="contact" className="py-32 noise bg-cream-200/40">
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs text-accent tracking-widest uppercase"
          >
            05 / Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl sm:text-6xl text-warm-900 tracking-tight italic"
          >
            Let's work together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-warm-600 text-lg leading-relaxed"
          >
            I'm always open to new opportunities, collaborations, or just
            a good conversation about tech. Feel free to reach out.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@pmec.dev"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-warm-900 hover:bg-warm-800 text-cream-100 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <Mail size={17} />
              Send me an email
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-eduardo-cardoso-b42042177"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-warm-700 border border-warm-900/15 rounded-full hover:border-warm-900/30 hover:text-warm-900 transition-all duration-300"
            >
              LinkedIn
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
