import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import CardSwap from './ui/CardSwap';
import ProjectModal from './ui/ProjectModal';
import { projects, type Project } from '@/data/projects';

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'live'
      ? 'bg-emerald-500'
      : status === 'development'
        ? 'bg-amber-500'
        : 'bg-warm-600';

  return (
    <span className="inline-flex items-center gap-2 text-xs text-warm-600 font-mono uppercase tracking-wider">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {status}
    </span>
  );
}

function SwapCard({ project }: { project: Project }) {
  return (
    <div className="w-full h-full card p-7 flex flex-col justify-between select-none">
      <div>
        <div className="flex items-start justify-between mb-4">
          <StatusDot status={project.status} />
          <div className="flex gap-1.5">
            {project.repo && (
              <span className="p-1.5 text-warm-600">
                <Github size={15} />
              </span>
            )}
            {project.href && (
              <span className="p-1.5 text-warm-600">
                <ExternalLink size={15} />
              </span>
            )}
          </div>
        </div>

        <h3 className="font-serif text-2xl text-warm-900 italic">
          {project.title}
        </h3>

        <p className="text-warm-600 text-sm leading-relaxed mt-3">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 bg-cream-200/80 text-warm-700 rounded border border-cream-300/60 uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] px-2 py-0.5 text-warm-600">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <p className="text-xs text-accent font-medium mt-4">
          Click to read more
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, controls } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        className="relative py-32 noise bg-cream-200/40"
      >

        <div className="section-container relative z-10">
          <SectionHeading
            label="02 / Projects"
            title="Things I've built"
            description="A selection of projects I've worked on, from idea to deployment."
            center
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeUp}
            className="flex justify-center"
          >
            <CardSwap
              items={projects}
              width={340}
              height={400}
              delay={4500}
              pauseOnHover
              onCardClick={(project) => setSelectedProject(project)}
              renderCard={(project) => <SwapCard project={project} />}
            />
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
