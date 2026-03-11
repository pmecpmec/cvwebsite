export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/pmec-home', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedro-eduardo-cardoso-b42042177', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:pmecdev@gmail.com', icon: 'mail' },
  { label: 'Discord', href: 'https://discord.com/users/pmec', icon: 'discord' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
