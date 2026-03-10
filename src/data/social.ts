export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/pmec-home', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedro-eduardo-cardoso-b42042177', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:contact@pmec.dev', icon: 'mail' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
