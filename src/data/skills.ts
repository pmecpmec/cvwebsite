export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
  usedFor?: string;
  learnedYear?: number;
  icon?: string;
  activelyUsing?: boolean;
}

export type SkillCategoryKey = 'languages' | 'frontend' | 'backend' | 'tools';

export interface SkillCategory {
  key: SkillCategoryKey;
  label: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: 'languages',
    label: 'Languages',
    items: [
      { name: 'C#', proficiency: 3, usedFor: 'PONG game, school projects', learnedYear: 2020, activelyUsing: false },
      { name: 'JavaScript', proficiency: 4, usedFor: 'cvwebsite, FitTrack, Cosmiv', learnedYear: 2020, activelyUsing: true },
      { name: 'PHP', proficiency: 3, usedFor: 'F1Registration, ProfileApp, schoppenexamen', learnedYear: 2020, activelyUsing: false },
      { name: 'Python', proficiency: 4, usedFor: 'Statsmec, MSGConverter, Cosmiv, Babcock', learnedYear: 2020, activelyUsing: true },
      { name: 'SQL', proficiency: 3, usedFor: 'PostgreSQL, Supabase, Babcock', learnedYear: 2021, activelyUsing: true },
      { name: 'TypeScript', proficiency: 4, usedFor: 'cvwebsite, Statsmec, Employes', learnedYear: 2021, activelyUsing: true },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'Astro', proficiency: 2, usedFor: 'Statsmec frontend', learnedYear: 2023, activelyUsing: false },
      { name: 'Framer Motion', proficiency: 3, usedFor: 'Portfolio animations', learnedYear: 2023, activelyUsing: true },
      { name: 'HTML/CSS', proficiency: 5, usedFor: 'Foundation for all web work', learnedYear: 2019, activelyUsing: true },
      { name: 'Next.js', proficiency: 4, usedFor: 'SSR apps', learnedYear: 2022, activelyUsing: true },
      { name: 'React', proficiency: 4, usedFor: 'cvwebsite, Statsmec, Employes, ENK', learnedYear: 2021, activelyUsing: true },
      { name: 'Recharts', proficiency: 3, usedFor: 'Statsmec dashboards', learnedYear: 2023, activelyUsing: false },
      { name: 'Svelte', proficiency: 2, usedFor: 'Statsmec components', learnedYear: 2023, activelyUsing: false },
      { name: 'Tailwind CSS', proficiency: 4, usedFor: 'All recent projects', learnedYear: 2022, activelyUsing: true },
      { name: 'Vite', proficiency: 3, usedFor: 'Portfolio, FitTrack, Statsmec', learnedYear: 2022, activelyUsing: true },
    ],
  },
  {
    key: 'backend',
    label: 'Backend & Databases',
    items: [
      { name: 'FastAPI', proficiency: 3, usedFor: 'Statsmec API', learnedYear: 2023, activelyUsing: false },
      { name: 'MongoDB', proficiency: 3, usedFor: 'Prototypes and experiments', learnedYear: 2022, activelyUsing: false },
      { name: 'Node.js', proficiency: 4, usedFor: 'Statsmec, API backends', learnedYear: 2021, activelyUsing: true },
      { name: 'PostgreSQL', proficiency: 3, usedFor: 'Statsmec, Employes', learnedYear: 2022, activelyUsing: true },
      { name: 'Prisma', proficiency: 3, usedFor: 'Type-safe ORM, ENK', learnedYear: 2022, activelyUsing: true },
      { name: 'Redis', proficiency: 2, usedFor: 'Statsmec caching', learnedYear: 2023, activelyUsing: false },
      { name: 'REST APIs', proficiency: 4, usedFor: 'Design, consumption, Babcock Maximo', learnedYear: 2021, activelyUsing: true },
      { name: 'SQLAlchemy', proficiency: 3, usedFor: 'Statsmec Python ORM', learnedYear: 2023, activelyUsing: false },
      { name: 'Supabase', proficiency: 3, usedFor: 'FitTrack auth & data', learnedYear: 2023, activelyUsing: true },
    ],
  },
  {
    key: 'tools',
    label: 'Tools & DevOps',
    items: [
      { name: 'Docker', proficiency: 3, usedFor: 'Local dev, deployments', learnedYear: 2022, activelyUsing: true },
      { name: 'Expo', proficiency: 3, usedFor: 'React Native, ENK internship', learnedYear: 2021, activelyUsing: false },
      { name: 'Figma', proficiency: 3, usedFor: 'UI mockups and prototypes', learnedYear: 2021, activelyUsing: true },
      { name: 'Git', proficiency: 4, usedFor: 'Version control on all projects', learnedYear: 2020, activelyUsing: true },
      { name: 'GitHub Actions', proficiency: 3, usedFor: 'CI/CD pipelines', learnedYear: 2022, activelyUsing: true },
      { name: 'Linear', proficiency: 3, usedFor: 'Project management', learnedYear: 2021, activelyUsing: true },
      { name: 'MDX', proficiency: 2, usedFor: 'docs project', learnedYear: 2022, activelyUsing: false },
      { name: 'Notion', proficiency: 3, usedFor: 'Docs and planning', learnedYear: 2021, activelyUsing: true },
      { name: 'Render', proficiency: 3, usedFor: 'Backend hosting', learnedYear: 2022, activelyUsing: false },
      { name: 'Vercel', proficiency: 3, usedFor: 'Portfolio, Next.js deploys', learnedYear: 2022, activelyUsing: true },
      { name: 'VS Code', proficiency: 5, usedFor: 'Primary editor', learnedYear: 2020, activelyUsing: true },
    ],
  },
];
