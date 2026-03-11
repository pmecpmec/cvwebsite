export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  label: string;
  items: Skill[];
}

export interface SkillTier {
  tier: string;
  categories?: SkillCategory[];
  items?: Skill[];
}

export const skillTiers: SkillTier[] = [
  {
    tier: "CORE STACK",
    categories: [
      {
        label: "Languages",
        items: [
          { name: "JavaScript" },
          { name: "TypeScript" },
          { name: "Python" },
          { name: "SQL" },
        ],
      },
      {
        label: "Frontend",
        items: [
          { name: "React" },
          { name: "Next.js" },
          { name: "Tailwind CSS" },
          { name: "HTML/CSS" },
        ],
      },
      {
        label: "Backend & Data",
        items: [
          { name: "Node.js" },
          { name: "PostgreSQL" },
          { name: "MongoDB" },
          { name: "REST APIs" },
        ],
      },
      {
        label: "Tools",
        items: [
          { name: "Git" },
          { name: "VS Code" },
          { name: "Visual Studio" },
          { name: "Notion" },
          { name: "Figma" },
          { name: "GitHub Actions" },
        ],
      },
    ],
  },
  {
    tier: "COMFORTABLE WITH",
    items: [
      { name: "Vue.js" },
      { name: "Framer Motion" },
      { name: "Render" },
      { name: "Excel" },
      { name: "GitKraken" },
      { name: "Linear" },
      { name: "Docker" },
    ],
  },
];

export const experienceWith: Skill[] = [
  { name: "C#" },
  { name: "Java" },
  { name: "Supabase" },
  { name: "Prisma" },
  { name: "Expo" },
  { name: "Vercel" },
];
