import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '@/data/social';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  mail: <Mail size={18} />,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-zinc-500">
          <span className="font-mono">&copy; {new Date().getFullYear()}</span>{' '}
          Pedro Campos
        </p>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-zinc-500 hover:text-accent-light transition-colors"
            >
              {iconMap[s.icon]}
            </a>
          ))}
        </div>

        <p className="text-xs text-zinc-600 font-mono">
          built with react + framer motion
        </p>
      </div>
    </footer>
  );
}
