import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  ExternalLink,
  ArrowDown,
  Code,
  Wrench,
  Cpu,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import SectionHeading from './ui/SectionHeading';
import {
  experience,
  education,
  type ExperienceItem,
  type EducationItem,
} from '@/data/experience';

function scrollToLinkedIn() {
  const btn = document.getElementById('linkedin-btn');
  if (btn) {
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => window.dispatchEvent(new Event('spark-linkedin')), 600);
  }
}

type ExperienceFilter = 'all' | 'software' | 'technology' | 'technical' | 'other';

function getRoleIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes('software') || r.includes('developer')) return Code;
  if (
    r.includes('technician') ||
    r.includes('administrative') ||
    r.includes('fire and gas')
  )
    return Cpu;
  if (r.includes('jamrunner') || r.includes('mechanic')) return Wrench;
  return Briefcase;
}

function getCategoryLabel(role: string): string {
  const r = role.toLowerCase();
  if (r.includes('software') || r.includes('developer')) return 'Software';
  if (
    r.includes('technician') ||
    r.includes('administrative') ||
    r.includes('fire and gas')
  )
    return 'Technology';
  if (r.includes('jamrunner') || r.includes('mechanic')) return 'Technical';
  return 'Other';
}

function getCategoryColor(role: string): string {
  const r = role.toLowerCase();
  if (r.includes('software') || r.includes('developer'))
    return 'bg-skill-accent/15 text-skill-accent border-skill-accent/30';
  if (
    r.includes('technician') ||
    r.includes('administrative') ||
    r.includes('fire and gas')
  )
    return 'bg-blue-500/15 text-blue-700 border-blue-500/30';
  if (r.includes('jamrunner') || r.includes('mechanic'))
    return 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30';
  return 'bg-warm-400/15 text-warm-700 border-warm-400/30';
}

function getFilterCount(filter: ExperienceFilter): number {
  if (filter === 'all') return experience.length;
  if (filter === 'software') {
    return experience.filter(
      (item) =>
        item.role.toLowerCase().includes('software') ||
        item.role.toLowerCase().includes('developer')
    ).length;
  }
  if (filter === 'technology') {
    return experience.filter(
      (item) =>
        item.role.toLowerCase().includes('technician') ||
        item.role.toLowerCase().includes('administrative') ||
        item.role.toLowerCase().includes('fire and gas')
    ).length;
  }
  if (filter === 'technical') {
    return experience.filter(
      (item) =>
        item.role.toLowerCase().includes('jamrunner') ||
        item.role.toLowerCase().includes('mechanic')
    ).length;
  }
  if (filter === 'other') {
    return experience.filter(
      (item) =>
        !item.role.toLowerCase().includes('software') &&
        !item.role.toLowerCase().includes('developer') &&
        !item.role.toLowerCase().includes('technician') &&
        !item.role.toLowerCase().includes('administrative') &&
        !item.role.toLowerCase().includes('fire and gas') &&
        !item.role.toLowerCase().includes('jamrunner') &&
        !item.role.toLowerCase().includes('mechanic')
    ).length;
  }
  return 0;
}

export default function Experience() {
  const { ref } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('software');
  const [educationExpanded, setEducationExpanded] = useState(false);

  const displayedEducation = useMemo(() => {
    if (educationExpanded) return education;
    return education.filter((item) => item.period.includes('Present'));
  }, [educationExpanded]);

  const filteredExperience = useMemo(() => {
    if (activeFilter === 'all') return experience;

    if (activeFilter === 'software') {
      return experience.filter(
        (item) =>
          item.role.toLowerCase().includes('software') ||
          item.role.toLowerCase().includes('developer')
      );
    }

    if (activeFilter === 'technology') {
      return experience.filter(
        (item) =>
          item.role.toLowerCase().includes('technician') ||
          item.role.toLowerCase().includes('administrative') ||
          item.role.toLowerCase().includes('fire and gas')
      );
    }

    if (activeFilter === 'technical') {
      return experience.filter(
        (item) =>
          item.role.toLowerCase().includes('jamrunner') ||
          item.role.toLowerCase().includes('mechanic')
      );
    }

    if (activeFilter === 'other') {
      return experience.filter(
        (item) =>
          !item.role.toLowerCase().includes('software') &&
          !item.role.toLowerCase().includes('developer') &&
          !item.role.toLowerCase().includes('technician') &&
          !item.role.toLowerCase().includes('administrative') &&
          !item.role.toLowerCase().includes('fire and gas') &&
          !item.role.toLowerCase().includes('jamrunner') &&
          !item.role.toLowerCase().includes('mechanic')
      );
    }

    return experience;
  }, [activeFilter]);

  const filterTabs: { key: ExperienceFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'software', label: 'Software' },
    { key: 'technology', label: 'Technology' },
    { key: 'technical', label: 'Technical' },
    { key: 'other', label: 'Other' },
  ];

  return (
    <section id="experience" className="py-32 noise bg-cream-200/40 relative z-10">
      <div className="section-container relative z-10">
        <SectionHeading
          label="03 / Experience"
          title="Where I've worked"
          description="Software roles and education so far."
          center
        />

        {/* Category filter with counts */}
        <div className="flex justify-center mb-8">
          <div
            className="filter-tabs-container flex flex-wrap gap-2 p-2 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm border border-cream-300/50"
            role="tablist"
            aria-label="Filter by category"
          >
            {filterTabs.map((tab) => {
              const count = getFilterCount(tab.key);
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-skill-accent text-warm-950 border border-skill-accent shadow-md scale-105'
                      : 'bg-transparent text-warm-600 border border-transparent hover:border-cream-400/60 hover:text-warm-700 hover:bg-cream-200/40'
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-8 flex items-center gap-2">
              <Briefcase size={14} />
              Work (
              {filteredExperience.length}{' '}
              {activeFilter !== 'all' ? `of ${experience.length}` : 'total'})
            </h3>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredExperience.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="card p-8 text-center"
                  >
                    <p className="text-warm-600 text-sm">
                      No roles match this filter. Try another category.
                    </p>
                  </motion.div>
                ) : (
                  filteredExperience.map((item) => (
                    <motion.div
                      key={`${item.company}-${item.period}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      variants={fadeUp}
                    >
                      <ExperienceCard item={item} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            <div className="mt-6 flex justify-center">
              {activeFilter === 'all' ? (
                <button
                  type="button"
                  onClick={() => setActiveFilter('software')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-cream-400/60 text-warm-600 hover:text-accent hover:border-skill-accent/50 transition-all duration-300"
                >
                  Show less
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-cream-400/60 text-warm-600 hover:text-accent hover:border-skill-accent/50 transition-all duration-300"
                >
                  Show all experience
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-8 flex items-center gap-2">
              <GraduationCap size={14} />
              Education (
              {displayedEducation.length}{' '}
              {!educationExpanded ? `of ${education.length}` : 'total'})
            </h3>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {displayedEducation.map((item) => (
                  <motion.div
                    key={`${item.school}-${item.period}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    variants={fadeUp}
                  >
                    <EducationCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-6 flex justify-center">
              {educationExpanded ? (
                <button
                  type="button"
                  onClick={() => setEducationExpanded(false)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-cream-400/60 text-warm-600 hover:text-accent hover:border-skill-accent/50 transition-all duration-300"
                >
                  Show less
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEducationExpanded(true)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-cream-400/60 text-warm-600 hover:text-accent hover:border-skill-accent/50 transition-all duration-300"
                >
                  Show all education
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>

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
            <ArrowDown
              size={15}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const RoleIcon = getRoleIcon(item.role);
  const categoryLabel = getCategoryLabel(item.role);
  const categoryColor = getCategoryColor(item.role);

  return (
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
      <div className="card p-6 group relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-skill-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden
        />
        <div className="relative">
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border mb-4 ${categoryColor}`}
          >
            <RoleIcon size={10} />
            {categoryLabel}
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-warm-900 italic group-hover:text-accent transition-colors">
                {item.role}
              </h4>
              <p className="text-sm text-warm-600 mt-0.5 font-medium">
                {item.company}
              </p>
            </div>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-600 hover:text-accent shrink-0 p-1 hover:scale-110 transition-all duration-300"
                aria-label={`${item.company} on LinkedIn`}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <p className="font-mono text-[11px] text-accent tracking-wider">
              {item.period}
            </p>
            <span className="w-1 h-1 rounded-full bg-warm-400" />
            <p className="text-[11px] text-warm-600">{item.location}</p>
          </div>
          <p className="text-sm text-warm-600 mt-3 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </Tilt>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  const isCurrent = item.period.includes('Present');

  return (
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
      <div className="card p-6 relative overflow-hidden pl-4">
        <div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-skill-accent to-skill-accent/20 rounded-l-2xl"
          aria-hidden
        />
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-serif text-lg text-warm-900 italic">
              {item.degree}
            </h4>
            <p className="text-sm text-warm-600 mt-0.5 font-medium">
              {item.school}
            </p>
          </div>
          {isCurrent && (
            <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-skill-accent/15 text-skill-accent border border-skill-accent/30">
              Current
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p className="font-mono text-[11px] text-accent tracking-wider">
            {item.period}
          </p>
          <span className="w-1 h-1 rounded-full bg-warm-400" />
          <p className="text-[11px] text-warm-600">{item.location}</p>
        </div>
        {item.description && (
          <p className="text-sm text-warm-600 mt-3 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </Tilt>
  );
}
