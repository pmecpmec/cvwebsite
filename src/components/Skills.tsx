import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations/variants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Tilt from "react-parallax-tilt";
import SectionHeading from "./ui/SectionHeading";
import { skillTiers, otherTechnologies } from "@/data/skills";

export default function Skills() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="skills" className="py-32">
      <div className="section-container">
        <SectionHeading
          label="04 / Skills"
          title="Tech I work with"
          description="Languages, frameworks, and tools I use often."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.1)}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10"
        >
          {/* Main tech stack */}
          <motion.div variants={fadeUp} className="flex-1 space-y-8">
            {skillTiers.map((tier) => (
              <motion.div key={tier.tier} variants={fadeUp}>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">
                  {tier.tier}
                </h3>

                {tier.categories ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tier.categories.map((category) => (
                      <Tilt
                        key={category.label}
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        glareEnable
                        glareMaxOpacity={0.08}
                        glareColor="#C4723A"
                        glarePosition="all"
                        glareBorderRadius="1rem"
                        scale={1.02}
                        transitionSpeed={400}
                      >
                        <div className="card p-6 group h-full">
                          <h4 className="font-mono text-[11px] uppercase tracking-widest text-accent/80 mb-4">
                            {category.label}
                          </h4>
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
                        </div>
                      </Tilt>
                    ))}
                  </div>
                ) : tier.items ? (
                  <div className="flex flex-wrap gap-2">
                    {tier.items.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 text-sm text-warm-600 bg-cream-200/60 border border-cream-300/60 rounded-lg hover:text-warm-700 hover:border-cream-400/80 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ))}
          </motion.div>

          {/* Side panel - Other Technologies I've Used */}
          <motion.div
            variants={fadeUp}
            className="lg:w-56 shrink-0"
          >
            <div className="opacity-80 border border-cream-300/50 rounded-2xl p-5 bg-cream-50/60">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-accent/70 mb-3">
                Other Technologies I've Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {otherTechnologies.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2 py-1 text-xs text-warm-600/90 border border-cream-300/40 rounded-md"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
