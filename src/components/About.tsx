import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef } from 'react';
import SectionHeading from './ui/SectionHeading';

export default function About() {
  const { ref, controls } = useScrollReveal();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-32">
      <div className="section-container">
        <SectionHeading label="01 / About" title="A bit about me" />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
          className="grid md:grid-cols-5 gap-12 items-start"
        >
          <motion.div ref={imgRef} variants={fadeUp} className="md:col-span-2 relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src="/image/background.jpg"
                alt="Pedro Eduardo Cardoso"
                className="w-full h-[120%] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-100/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/15 rounded-2xl -z-10" />
          </motion.div>

          <motion.div variants={stagger(0.1)} className="md:col-span-3 space-y-5">
            <motion.p variants={fadeUp} className="text-warm-800 text-lg leading-relaxed">
              I'm Pedro, 23, studying Software Development at Windesheim Almere.
              I'm the kind of person who doesn't give up when something doesn't
              work — I'll keep going until I figure it out. I'm really into{' '}
              <span className="text-warm-900 font-medium">front-end development</span>{' '}
              because I like seeing what I build come to life.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              I enjoy experimenting with frameworks like React and Tailwind,
              writing clean code, and building interfaces that actually feel
              good to use. I'm curious by nature, always looking to improve —
              not just as a developer, but as a person too.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              When I'm not coding, you'll find me at the gym, playing
              Counter-Strike, or exploring new tech. I believe great software
              is built with intention — every interaction, every line of code
              should serve a purpose.
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
