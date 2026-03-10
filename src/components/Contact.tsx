import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function Contact() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="contact" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-sm text-accent tracking-wider uppercase"
          >
            04 / Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-tight"
          >
            Let's work together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-zinc-400 text-lg leading-relaxed"
          >
            I'm always open to new opportunities, collaborations, or just a
            good conversation about tech. Feel free to reach out.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@pmec.dev"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-xl transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.25)]"
            >
              <Mail size={18} />
              Send me an email
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="https://linkedin.com/in/pmec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-zinc-300 border border-white/10 rounded-xl hover:border-white/20 hover:text-white transition-all"
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
