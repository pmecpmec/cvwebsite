import { useState, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  FolderKanban,
  Briefcase,
  Wrench,
  Mail,
  Github,
  Linkedin,
  ArrowUp,
  Search,
} from 'lucide-react';
import { navLinks, socials } from '@/data/social';
import { projects } from '@/data/projects';

const sectionIcons: Record<string, typeof User> = {
  About: User,
  Projects: FolderKanban,
  Experience: Briefcase,
  Skills: Wrench,
  Contact: Mail,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const socialIcons: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-warm-900/30 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4"
          >
            <Command
              className="bg-cream-100 border border-warm-900/10 rounded-2xl shadow-xl overflow-hidden"
              label="Quick navigation"
            >
              <div className="flex items-center gap-3 px-4 border-b border-warm-900/8">
                <Search size={16} className="text-warm-500 shrink-0" />
                <Command.Input
                  placeholder="Where do you want to go?"
                  className="w-full py-4 bg-transparent text-sm text-warm-900 placeholder:text-warm-500 outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-warm-500 bg-cream-200 border border-warm-900/8 rounded-md shrink-0">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-8 text-center text-sm text-warm-500">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-accent"
                >
                  <Command.Item
                    onSelect={scrollToTop}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-warm-700 rounded-xl data-[selected=true]:bg-cream-200 data-[selected=true]:text-warm-900 transition-colors"
                  >
                    <ArrowUp size={15} className="text-warm-500" />
                    Back to top
                  </Command.Item>
                  {navLinks.map((link) => {
                    const Icon = sectionIcons[link.label] || FolderKanban;
                    return (
                      <Command.Item
                        key={link.href}
                        value={link.label}
                        onSelect={() => navigate(link.href)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-warm-700 rounded-xl data-[selected=true]:bg-cream-200 data-[selected=true]:text-warm-900 transition-colors"
                      >
                        <Icon size={15} className="text-warm-500" />
                        {link.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Separator className="h-px bg-warm-900/6 my-2 mx-2" />

                <Command.Group
                  heading="Projects"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-accent"
                >
                  {projects.map((p) => (
                    <Command.Item
                      key={p.title}
                      value={p.title}
                      onSelect={() => p.href && navigate(p.href)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-warm-700 rounded-xl data-[selected=true]:bg-cream-200 data-[selected=true]:text-warm-900 transition-colors"
                    >
                      <FolderKanban size={15} className="text-warm-500" />
                      <span>{p.title}</span>
                      <span className="ml-auto text-[10px] font-mono text-warm-500 capitalize">{p.status}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="h-px bg-warm-900/6 my-2 mx-2" />

                <Command.Group
                  heading="Social"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-accent"
                >
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon] || Mail;
                    return (
                      <Command.Item
                        key={s.label}
                        value={s.label}
                        onSelect={() => navigate(s.href)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-warm-700 rounded-xl data-[selected=true]:bg-cream-200 data-[selected=true]:text-warm-900 transition-colors"
                      >
                        <Icon size={15} className="text-warm-500" />
                        {s.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>

              <div className="border-t border-warm-900/6 px-4 py-2.5 flex items-center justify-between">
                <span className="text-[10px] text-warm-500 font-mono">
                  Navigate with <kbd className="px-1 py-0.5 bg-cream-200 border border-warm-900/8 rounded text-[9px]">↑↓</kbd> and select with <kbd className="px-1 py-0.5 bg-cream-200 border border-warm-900/8 rounded text-[9px]">↵</kbd>
                </span>
                <span className="text-[10px] text-warm-400 font-mono">
                  <kbd className="px-1 py-0.5 bg-cream-200 border border-warm-900/8 rounded text-[9px]">⌘K</kbd>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
