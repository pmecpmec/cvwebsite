export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  href?: string;
  repo?: string;
  image?: string;
  featured: boolean;
  status: "live" | "development" | "concept";
}

export const projects: Project[] = [
  {
    title: "Statsmec",
    description:
      "A performance analytics dashboard for Counter-Strike 2 players with real-time stat tracking and match history.",
    longDescription:
      "Built to help competitive CS2 players track their performance over time. Features real-time stat parsing, match history visualization, and performance trend analysis.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Steam API"],
    href: "https://stats.pmec.dev",
    repo: "https://github.com/pmec-home/statsmec",
    featured: true,
    status: "development",
  },
  {
    title: "FitTrack",
    description:
      "A fitness tracking application to log workouts, track progress, and visualize training data over time.",
    longDescription:
      "A comprehensive fitness companion designed for people who take their training seriously. Log workouts, track progressive overload, and visualize your progress with clean charts.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Chart.js"],
    href: "https://fit.pmec.dev",
    repo: "https://github.com/pmec-home/fittrack",
    featured: true,
    status: "development",
  },
  {
    title: "Portfolio",
    description:
      "This personal portfolio site.. designed and built from scratch with React, Framer Motion, and Tailwind.",
    longDescription:
      "A handcrafted developer portfolio focused on clean design, smooth motion, and strong visual hierarchy. Built with performance and accessibility in mind.",
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vite"],
    href: "https://pmec.dev",
    repo: "https://github.com/pmec-home/cvwebsite",
    featured: true,
    status: "live",
  },
  {
    title: "TaskFlow",
    description:
      "A minimal project management tool with kanban boards, drag-and-drop, and real-time collaboration.",
    longDescription:
      "TaskFlow is an opinionated project management tool that strips away the bloat. Built for small teams who want kanban boards without the enterprise complexity.",
    tech: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    featured: false,
    status: "concept",
  },
];
