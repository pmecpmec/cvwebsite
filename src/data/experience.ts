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
    role: "Administrative Employee & Software Developer (Internship)",
    company: "Babcock International Group",
    period: "Jan 2026 – Present",
    location: "Schiphol, Netherlands",
    description:
      "Dual role combining administrative support with software development internship (ADSD program at Windesheim). Developing an automated integration tool that bridges MSG-3 Excel documents with IBM Maximo work management system.",
    href: "https://www.linkedin.com/company/babcock-international-group",
  },
  {
    role: "Assistant Mechanic & Jamrunner",
    company: "Babcock International Group",
    period: "Nov 2022 – Sep 2025",
    location: "Schiphol, Netherlands",
    description:
      "Ensured smooth operation of baggage belt systems at the airport. Identified and resolved issues to prevent delays in baggage handling, ensuring seamless passenger experiences.",
    href: "https://www.linkedin.com/company/babcock-international-group",
  },
  {
    role: "Software Developer (Internship)",
    company: "Employes",
    period: "Feb 2023 – Jun 2023",
    location: "Zwolle, Netherlands",
    description:
      "Developed a personalized notepad app for progress tracking. Expanded skills with PostgreSQL, TypeScript, React, and JavaScript.",
    href: "https://www.linkedin.com/company/employes",
  },
  {
    role: "Food Runner",
    company: "Steakhouse Roos",
    period: "Jun 2022 – Oct 2022",
    location: "Amsterdam, Netherlands",
    description:
      "Responsible for dishwashing, preparing side dishes, serving drinks, and running food. Maintained kitchen cleanliness and contributed to efficient workflow while enhancing the dining experience.",
    href: "https://www.linkedin.com/company/steakhouse-roos",
  },
  {
    role: "Assistant Chef",
    company: "Café Carbòn Jordaan",
    period: "Feb 2022 – Jun 2022",
    location: "Amsterdam, Netherlands",
    description:
      "Prepared side dishes, made desserts, and handled dishwashing duties. Assisted with food running during busy times to ensure smooth operations and timely service.",
    href: "https://www.linkedin.com/company/cafe-carbon",
  },
  {
    role: "Software Developer (Internship)",
    company: "ENK Software BV",
    period: "Nov 2021 – Mar 2022",
    location: "Uitgeest, Netherlands",
    description:
      "Learned React and React Native basics, remaking the ENK Software app for enhanced responsiveness and speed. Completed courses in HTML, CSS, and JavaScript to strengthen development skills.",
    href: "https://www.linkedin.com/company/enk-software",
  },
  {
    role: "Logistics Employee",
    company: "DHL",
    period: "May 2021 – Aug 2021",
    location: "Alkmaar, Netherlands",
    description:
      "Involved in logistics operations including packing packages and organizing them for sorting and delivery. Contributed to efficient workflow in a fast-paced environment.",
    href: "https://www.linkedin.com/company/dhl",
  },
  {
    role: "Computer Technician (Internship)",
    company: "FixitNU B.V",
    period: "Jan 2020 – Jun 2020",
    location: "Amsterdam, Netherlands",
    description:
      "Gained hands-on experience repairing Windows and Mac laptops. Assisted customers with technical and hardware issues, learned phone repair, and managed a PostNL point during COVID-19.",
    href: "https://www.linkedin.com/company/fixitnu",
  },
  {
    role: "Team Leader",
    company: "Vomar Voordeelmarkt",
    period: "Jun 2018 – May 2021",
    location: "Heerhugowaard, Netherlands",
    description:
      "Started as a shelf stocker and was promoted to team leader. Oversaw team operations for 3 years, demonstrating leadership and responsibility in managing daily workflows.",
    href: "https://www.linkedin.com/company/vomar-voordeelmarkt",
  },
  {
    role: "Fire and Gas Detection (Internship)",
    company: "Dräger",
    period: "May 2017 – Jul 2017",
    location: "Netherlands",
    description:
      "2-week trial internship during high school. Assisted with installation and testing of fire alarms, gaining early exposure to technical systems and safety equipment.",
    href: "https://www.linkedin.com/company/draeger",
  },
];

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  location: string;
  description?: string;
}

export const education: EducationItem[] = [
  {
    degree: "AD Software Developer",
    school: "Windesheim",
    period: "2023 – Present",
    location: "Almere",
    description:
      "Formula 1 leaderboard for a school event with CRUD. Zoo application for counting animals with CRUD. Cross-platform development learning about APIs. Built PONG with enhanced features using C#. Started this portfolio website.",
  },
  {
    degree: "MBO Niveau 4 Software Developer",
    school: "Vonk",
    period: "2020 – 2023",
    location: "Schagen",
    description:
      "Learned Scrum and Kanban flow. Programmed drones for people detection, color-based enemy detection, and hand sign control. Created a map application for a helicopter used by the marine.",
  },
  {
    degree: "MBO Niveau 2 ICT-Medewerker",
    school: "Vonk",
    period: "2018 – 2020",
    location: "Schagen",
    description:
      "Building PCs, networking, and hardware repair. Repaired network cables and installed networks, routers, and LAN setups for events.",
  },
];
