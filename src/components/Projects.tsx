import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { projects } from '@/data/projects';

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'live'
      ? 'bg-emerald-500'
      : status === 'development'
        ? 'bg-amber-500'
        : 'bg-warm-600';

  return (
    <span className="inline-flex items-center gap-2 text-xs text-warm-600 font-mono uppercase tracking-wider">
      <span className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
      {status}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group card relative overflow-hidden cursor-pointer"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-7 sm:p-8">
        <div className="flex items-start justify-between mb-5">
          <StatusDot status={project.status} />
          <div className="flex gap-1.5">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-warm-600 hover:text-warm-900 hover:bg-cream-200 rounded-lg transition-all"
                aria-label={`${project.title} source code`}
              >
                <Github size={17} />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-warm-600 hover:text-accent hover:bg-accent-muted rounded-lg transition-all"
                aria-label={`Visit ${project.title}`}
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-serif text-2xl text-warm-900 italic group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-warm-600 text-sm leading-relaxed mt-3 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2.5 py-1 bg-cream-200/80 text-warm-700 rounded-md border border-cream-300/60 uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>

        {project.href && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View project
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, controls } = useScrollReveal();
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 noise bg-cream-200/40">
      <div className="section-container relative z-10">
        <SectionHeading
          label="02 / Projects"
          title="Things I've built"
          description="A selection of projects I've worked on — from idea to deployment."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.15)}
          className="grid md:grid-cols-2 gap-6"
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>

        {other.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.12)}
            className="mt-6 grid md:grid-cols-2 gap-6"
          >
            {other.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
