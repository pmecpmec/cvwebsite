export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/pmec-home', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pmec', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:contact@pmec.dev', icon: 'mail' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
