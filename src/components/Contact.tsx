import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function Contact() {
  const { ref, controls } = useScrollReveal();
  const [sparkLinkedIn, setSparkLinkedIn] = useState(false);
  const [sparkEmail, setSparkEmail] = useState(false);

  useEffect(() => {
    const linkedInHandler = () => {
      setSparkLinkedIn(true);
      setTimeout(() => setSparkLinkedIn(false), 2000);
    };
    const emailHandler = () => {
      setSparkEmail(true);
      setTimeout(() => setSparkEmail(false), 2000);
    };
    window.addEventListener('spark-linkedin', linkedInHandler);
    window.addEventListener('spark-email', emailHandler);
    return () => {
      window.removeEventListener('spark-linkedin', linkedInHandler);
      window.removeEventListener('spark-email', emailHandler);
    };
  }, []);

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
              id="email-btn"
              href="mailto:pmecdev@gmail.com"
              className={`relative group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 ${
                sparkEmail
                  ? 'bg-accent text-cream-100 shadow-[0_0_24px_rgba(196,114,58,0.35)] scale-105'
                  : 'bg-warm-900 hover:bg-warm-800 text-cream-100 hover:shadow-lg'
              }`}
            >
              {sparkEmail && (
                <>
                  <span className="absolute inset-0 rounded-full animate-ping bg-accent/20" />
                  <span className="absolute -inset-1 rounded-full bg-accent/10 blur-md" />
                </>
              )}
              <Mail size={17} className="relative" />
              <span className="relative">Send me an email</span>
              <ArrowUpRight
                size={15}
                className="relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              id="linkedin-btn"
              href="https://www.linkedin.com/in/pedro-eduardo-cardoso-b42042177"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 ${
                sparkLinkedIn
                  ? 'text-accent border-accent/50 shadow-[0_0_24px_rgba(196,114,58,0.3)] scale-105'
                  : 'text-warm-700 border border-warm-900/15 hover:border-warm-900/30 hover:text-warm-900'
              }`}
            >
              {sparkLinkedIn && (
                <>
                  <span className="absolute inset-0 rounded-full animate-ping bg-accent/10" />
                  <span className="absolute -inset-1 rounded-full bg-accent/5 blur-md" />
                </>
              )}
              <span className="relative">LinkedIn</span>
              <ArrowUpRight size={15} className="relative" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
