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
        <SectionHeading label="01 / About" title="A bit about me" center />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
        >
          {/* Photo - wider */}
          <motion.div ref={imgRef} variants={fadeUp} className="relative group max-w-3xl mx-auto mb-14">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src="/image/background.jpg"
                alt="Pedro Eduardo Cardoso"
                className="w-full h-[130%] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-100/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/15 rounded-2xl -z-10" />
          </motion.div>

          {/* Text underneath */}
          <motion.div variants={stagger(0.1)} className="max-w-2xl mx-auto space-y-5">
            <motion.p variants={fadeUp} className="text-warm-800 text-lg leading-relaxed">
              I'm Pedro, 24, currently living in Amsterdam and studying Software Development at Windesheim in Almere. Originally born in Portugal, my curiosity for technology started early. From playing on a Game Boy as a kid to experimenting with modern development tools today, I've always been fascinated by how technology works and how it can be built.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-800 text-lg leading-relaxed">
              I'm especially drawn to{' '}
              <span className="relative inline-block text-warm-900 font-medium cursor-default group/fe">
                <span className="relative z-10 group-hover/fe:text-accent transition-colors duration-300">front-end development</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent/20 rounded-full group-hover/fe:h-full group-hover/fe:bg-accent/[0.08] transition-all duration-300" />
              </span>{' '}
              because I enjoy seeing ideas come to life in the browser. Building interfaces that feel smooth, responsive, and intentional is something I genuinely enjoy.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              I'm naturally curious and persistent. When something doesn't work, I keep digging until I understand it. That mindset pushes me to continuously improve, both as a developer and as a person.
            </motion.p>

            <motion.p variants={fadeUp} className="text-warm-600 leading-relaxed">
              Outside of coding you'll usually find me in the gym, playing competitive games like Counter-Strike, or exploring new technologies and tools.
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
