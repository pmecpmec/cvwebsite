import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { projects } from '@/data/projects';

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'live'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : status === 'development'
        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono rounded-full border ${color}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="glass group relative overflow-hidden hover:border-accent/20 transition-all duration-500"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <StatusBadge status={project.status} />
          <div className="flex gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-white transition-colors"
                aria-label={`${project.title} source code`}
              >
                <Github size={18} />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-accent-light transition-colors"
                aria-label={`Visit ${project.title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-light transition-colors">
          {project.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 bg-white/[0.04] text-zinc-500 rounded-md border border-white/[0.04]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, controls } = useScrollReveal();
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 bg-surface-raised/50">
      <div className="section-container">
        <SectionHeading
          label="02 / Projects"
          title="Things I've built"
          description="A selection of projects I've worked on — from concept to deployment."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger(0.12)}
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
            variants={stagger(0.1)}
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
