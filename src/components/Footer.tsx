import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '@/data/social';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={17} />,
  linkedin: <Linkedin size={17} />,
  mail: <Mail size={17} />,
};

export default function Footer() {
  return (
    <footer className="border-t border-warm-900/[0.06] py-12">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-warm-600">
          <span className="font-mono">&copy; {new Date().getFullYear()}</span>{' '}
          Pedro Eduardo Cardoso
        </p>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-warm-600 hover:text-accent transition-colors"
            >
              {iconMap[s.icon]}
            </a>
          ))}
        </div>

        <p className="text-[11px] text-cream-500 font-mono tracking-wider">
          react + framer motion
        </p>
      </div>
    </footer>
  );
}
