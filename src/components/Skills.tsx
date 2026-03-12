import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/animations/variants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { LayoutGrid, Clock, X, ExternalLink, Layers } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { skillCategories, type Skill, type SkillCategoryKey } from '@/data/skills';
import { projects } from '@/data/projects';
import { useTechFilter } from '@/context/TechFilterContext';

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= level ? 'bg-skill-accent' : 'bg-cream-400/40'
          }`}
        />
      ))}
    </div>
  );
}

function getProjectsForTech(techName: string) {
  return projects.filter((p) =>
    p.tech.some((t) => t.toLowerCase() === techName.toLowerCase())
  );
}

function SkillTile({
  skill,
  isPrimary,
  projectCount,
  onClick,
}: {
  skill: Skill;
  isPrimary: boolean;
  projectCount: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="skills-tile group w-full text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-skill-accent focus-visible:ring-offset-2"
      aria-label={`${skill.name} - ${skill.proficiency} of 5 proficiency. ${projectCount > 0 ? `Used in ${projectCount} project${projectCount > 1 ? 's' : ''}. Click to filter projects.` : 'Click to view projects.'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-sans font-medium text-sm transition-colors ${
                isPrimary ? 'text-skill-accent' : 'text-warm-700 group-hover:text-warm-900'
              }`}
            >
              {skill.name}
            </span>
            {skill.activelyUsing && (
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" aria-label="Actively using" />
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <ProficiencyDots level={skill.proficiency} />
            {skill.learnedYear && (
              <span className="text-[10px] text-warm-500 font-mono">
                since {skill.learnedYear}
              </span>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            {skill.usedFor && (
              <p className="text-xs text-warm-600 leading-relaxed">{skill.usedFor}</p>
            )}
            {projectCount > 0 && (
              <p className="text-xs text-skill-accent font-medium mt-1 flex items-center gap-1">
                <ExternalLink size={10} />
                {projectCount} project{projectCount > 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Skills() {
  const { ref } = useScrollReveal();
  const { selectedTech, setSelectedTech, clearFilter } = useTechFilter();
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey | 'all'>('all');
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const filteredCategories = useMemo(() => {
    let cats = !activeCategory || activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.key === activeCategory);
    if (showActiveOnly) {
      cats = cats
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => item.activelyUsing === true),
        }))
        .filter((cat) => cat.items.length > 0);
    }
    return cats;
  }, [activeCategory, showActiveOnly]);

  const allSkillsForTimeline = useMemo(() => {
    let cats = !activeCategory || activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.key === activeCategory);
    if (showActiveOnly) {
      cats = cats.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.activelyUsing === true),
      }));
    }
    return cats
      .flatMap((cat) => cat.items.map((s) => ({ ...s, category: cat.label })))
      .sort((a, b) => (b.learnedYear ?? 0) - (a.learnedYear ?? 0));
  }, [activeCategory, showActiveOnly]);

  const handleSkillClick = (skillName: string) => {
    const projects = getProjectsForTech(skillName);
    if (projects.length > 0) {
      setSelectedTech(skillName);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoryTabs: { key: SkillCategoryKey | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    ...skillCategories.map((c) => ({ key: c.key, label: c.label })),
  ];

  const getCategoryCount = (key: SkillCategoryKey | 'all'): number => {
    const cats = key === 'all' ? skillCategories : skillCategories.filter((c) => c.key === key);
    if (showActiveOnly) {
      return cats.reduce(
        (sum, cat) => sum + cat.items.filter((i) => i.activelyUsing === true).length,
        0
      );
    }
    return cats.reduce((sum, cat) => sum + cat.items.length, 0);
  };

  const totalCount = skillCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <section
      id="skills"
      className="skills-section py-32 relative z-10 overflow-hidden bg-warm-950/5"
      aria-label="Skills and technologies"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="section-container relative">
        <SectionHeading
          label="04 / Skills"
          title="Tech I work with"
          description="Languages, frameworks, and tools. Click a skill to filter projects."
        />

        <div ref={ref} className="space-y-6">
          {/* Category filter + View toggle - same style as Experience */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex justify-center sm:justify-start">
              <div
                className="filter-tabs-container flex flex-wrap gap-2 p-2 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm border border-cream-300/50"
                role="tablist"
                aria-label="Filter by category"
              >
                {categoryTabs.map((tab) => {
                  const count = getCategoryCount(tab.key);
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(tab.key)}
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

            <div className="flex items-center justify-center sm:justify-end gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setShowActiveOnly(!showActiveOnly)}
                aria-pressed={showActiveOnly}
                aria-label="Toggle between active skills and all skills"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  showActiveOnly
                    ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                    : 'bg-cream-200/60 text-warm-600 border border-cream-300/60 hover:border-cream-400/80 hover:text-warm-700'
                }`}
              >
                <Layers size={14} />
                {showActiveOnly ? 'Active Only' : 'Show All'}
                <span className="text-[10px] opacity-70">
                  ({getCategoryCount('all')} of {totalCount})
                </span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid view"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-skill-accent/15 text-skill-accent'
                    : 'text-warm-500 hover:text-warm-700'
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                aria-pressed={viewMode === 'timeline'}
                aria-label="Timeline view by year learned"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-skill-accent/15 text-skill-accent'
                    : 'text-warm-500 hover:text-warm-700'
                }`}
              >
                <Clock size={18} />
              </button>
            </div>
          </div>

          {/* Active filter chip */}
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-warm-600">Filtering projects by:</span>
              <button
                type="button"
                onClick={clearFilter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-skill-accent/15 text-skill-accent border border-skill-accent/30 text-sm font-medium hover:bg-skill-accent/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-skill-accent"
              >
                {selectedTech}
                <X size={14} />
              </button>
            </motion.div>
          )}

          {/* Grid view */}
          {viewMode === 'grid' && (
            <div className="space-y-8">
              {filteredCategories
                .filter((category) => category.items.length > 0)
                .map((category) => (
                <motion.div key={category.key} variants={fadeUp}>
                  <h3 className="font-sans font-semibold text-warm-800 text-sm mb-3">
                    {category.label}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                      {category.items.map((skill) => {
                        const projectCount = getProjectsForTech(skill.name).length;
                        const isPrimary = projectCount >= 2 || skill.proficiency >= 4;
                        return (
                          <SkillTile
                            key={skill.name}
                            skill={skill}
                            isPrimary={isPrimary}
                            projectCount={projectCount}
                            onClick={() => handleSkillClick(skill.name)}
                          />
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Timeline view - ordered by year learned */}
          {viewMode === 'timeline' && (
            <motion.div
              variants={fadeUp}
              className="skills-timeline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {allSkillsForTimeline.map((skill) => {
                  const projectCount = getProjectsForTech(skill.name).length;
                  const isPrimary = projectCount >= 2 || skill.proficiency >= 4;
                  return (
                    <SkillTile
                      key={skill.name}
                      skill={skill}
                      isPrimary={isPrimary}
                      projectCount={projectCount}
                      onClick={() => handleSkillClick(skill.name)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
