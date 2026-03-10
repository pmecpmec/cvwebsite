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
          label="03 / Skills"
          title="Tech I work with"
          description="The tools and technologies I use to bring ideas to life."
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
              className="glass p-6 hover:border-white/10 transition-colors group"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-5">
                {category.label}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/50" />
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
