export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  href?: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Employes",
    period: "Feb 2023 – Jun 2023",
    location: "Zwolle, Netherlands",
    description:
      "Developed a personalized notepad app for progress tracking. Expanded skills with PostgreSQL, TypeScript, React, and JavaScript.",
    href: "https://www.linkedin.com/company/employes",
  },
  {
    role: "Software Developer",
    company: "ENK Software BV",
    period: "Nov 2021 – Mar 2022",
    location: "Uitgeest, Netherlands",
    description:
      "Internship focused on React and React Native. Remade the ENK Software app in a new language for better responsiveness and speed.",
    href: "https://www.linkedin.com/company/enk-software",
  },
];

export const education = [
  {
    degree: "AD Software Developer",
    school: "Windesheim",
    period: "2023 – 2025",
    location: "Almere",
  },
  {
    degree: "MBO Niveau 4 Software Developer",
    school: "Vonk",
    period: "2020 – 2023",
    location: "Schagen",
  },
];
