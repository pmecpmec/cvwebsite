import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from './ui/SectionHeading';
import { skills } from '@/data/skills';

export default function Skills() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="skills" className="py-32">
      <div className="section-container">
        <SectionHeading
          label="04 / Skills"
          title="Tech I work with"
          description="Languages, frameworks, and tools I use daily."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.1)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((category) => (
            <motion.div
              key={category.label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="card p-6 group"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-5">
                {category.label}
              </h3>
              <ul className="space-y-3">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="text-sm text-warm-600 group-hover:text-warm-700 transition-colors flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
