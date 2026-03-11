import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, ArrowDown } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import SectionHeading from './ui/SectionHeading';
import { experience, education } from '@/data/experience';

function scrollToLinkedIn() {
  const btn = document.getElementById('linkedin-btn');
  if (btn) {
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => window.dispatchEvent(new Event('spark-linkedin')), 600);
  }
}

export default function Experience() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="experience" className="py-32 noise bg-cream-200/40 relative z-10">
      <div className="section-container relative z-10">
        <SectionHeading
          label="03 / Experience"
          title="Where I've worked"
          description="Software roles and education so far."
          center
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-8">
              Work
            </h3>
            <div className="space-y-6">
              {experience.map((item) => (
                <motion.div key={`${item.company}-${item.period}`} variants={fadeUp}>
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    glareEnable
                    glareMaxOpacity={0.06}
                    glareColor="#C4723A"
                    glarePosition="all"
                    glareBorderRadius="1rem"
                    scale={1.015}
                    transitionSpeed={400}
                  >
                    <div className="card p-6 group">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-serif text-lg text-warm-900 italic group-hover:text-accent transition-colors">
                            {item.role}
                          </h4>
                          <p className="text-sm text-warm-600 mt-0.5">{item.company}</p>
                        </div>
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-warm-600 hover:text-accent transition-colors shrink-0 p-1"
                            aria-label={`${item.company} on LinkedIn`}
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-accent mt-3 tracking-wider">{item.period}</p>
                      <p className="text-[11px] text-warm-600 mt-1">{item.location}</p>
                      <p className="text-sm text-warm-600 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-8">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((item) => (
                <motion.div key={`${item.school}-${item.period}`} variants={fadeUp}>
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    glareEnable
                    glareMaxOpacity={0.06}
                    glareColor="#C4723A"
                    glarePosition="all"
                    glareBorderRadius="1rem"
                    scale={1.015}
                    transitionSpeed={400}
                  >
                    <div className="card p-6">
                      <h4 className="font-serif text-lg text-warm-900 italic">{item.degree}</h4>
                      <p className="text-sm text-warm-600 mt-0.5">{item.school}</p>
                      <p className="font-mono text-[11px] text-accent mt-3 tracking-wider">{item.period}</p>
                      <p className="text-[11px] text-warm-600 mt-1">{item.location}</p>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <button
            onClick={scrollToLinkedIn}
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-transparent transition-all duration-300 text-warm-600 hover:text-accent"
          >
            See my full profile on LinkedIn
            <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
