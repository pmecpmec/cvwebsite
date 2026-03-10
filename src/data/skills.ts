export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  label: string;
  items: Skill[];
}

export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C#' },
      { name: 'SQL' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Node.js' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Supabase' },
      { name: 'REST APIs' },
      { name: 'Prisma' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'VS Code' },
      { name: 'Figma' },
      { name: 'Vercel' },
      { name: 'GitHub Actions' },
    ],
  },
];
