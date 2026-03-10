import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from './ui/SectionHeading';

export default function About() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="about" className="py-32">
      <div className="section-container">
        <SectionHeading
          label="01 / About"
          title="A bit about me"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
          className="grid md:grid-cols-5 gap-12 items-start"
        >
          {/* Portrait / visual */}
          <motion.div variants={fadeUp} className="md:col-span-2 relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src="/image/background.jpg"
                alt="Pedro Campos"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Bio text */}
          <motion.div variants={stagger(0.1)} className="md:col-span-3 space-y-5">
            <motion.p variants={fadeUp} className="text-zinc-300 text-lg leading-relaxed">
              I'm a software developer based in the Netherlands, passionate about
              building digital products that are fast, intuitive, and visually
              refined. I care deeply about the intersection of{' '}
              <span className="text-white font-medium">design</span> and{' '}
              <span className="text-white font-medium">engineering</span>.
            </motion.p>

            <motion.p variants={fadeUp} className="text-zinc-400 leading-relaxed">
              Currently focused on full-stack web development with React and
              TypeScript. I enjoy working across the entire stack — from database
              architecture to pixel-perfect UI. When I'm not coding, you'll find
              me at the gym, playing Counter-Strike, or exploring new tech.
            </motion.p>

            <motion.p variants={fadeUp} className="text-zinc-400 leading-relaxed">
              I believe great software is built with intention. Every interaction,
              every animation, every line of code should serve a purpose. That
              philosophy shapes everything I build.
            </motion.p>

            <motion.div variants={fadeUp} className="pt-4 flex flex-wrap gap-x-10 gap-y-3 text-sm">
              {[
                ['Location', 'Netherlands'],
                ['Focus', 'Full-Stack Web Dev'],
                ['Interests', 'Fitness · Gaming · Design'],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="font-mono text-accent text-xs uppercase tracking-wider">
                    {label}
                  </span>
                  <p className="mt-1 text-zinc-300">{value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
