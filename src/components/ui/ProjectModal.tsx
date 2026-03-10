import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, PartyPopper } from 'lucide-react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project | null;
  onClose: () => void;
}

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fire = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const colors = ['#C4723A', '#D98B55', '#E5A66E', '#F0C896', '#7c3aed', '#34d399', '#fbbf24'];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; rotation: number; spin: number;
      life: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 10,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 10,
        life: 1,
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.vx *= 0.98;
        p.rotation += p.spin;
        p.life -= 0.015;

        if (p.life <= 0) continue;
        alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (alive) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { canvasRef, fire };
}

const IS_PORTFOLIO = (href?: string) =>
  href && (href.includes('pmec.dev') && !href.includes('stats.') && !href.includes('fit.'));

export default function ProjectModal({ project, onClose }: Props) {
  const [youAreHere, setYouAreHere] = useState(false);
  const { canvasRef, fire } = useConfetti();

  const handleVisitClick = (e: React.MouseEvent) => {
    if (project && IS_PORTFOLIO(project.href)) {
      e.preventDefault();
      setYouAreHere(true);
      fire();
    }
  };

  const handleClose = () => {
    setYouAreHere(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-warm-900/30 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-cream-50 rounded-2xl border border-cream-300/60 shadow-card-hover overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-warm-600 hover:text-warm-900 hover:bg-cream-200 rounded-lg transition-all z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="p-8 pt-7">
              <StatusBadge status={project.status} />

              <h3 className="font-serif text-3xl text-warm-900 italic mt-4">
                {project.title}
              </h3>

              <p className="text-warm-600 leading-relaxed mt-4">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2.5 py-1 bg-cream-200/80 text-warm-700 rounded-md border border-cream-300/60 uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                {project.href && (
                  youAreHere ? (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
                      <PartyPopper size={15} />
                      You're already here!
                    </span>
                  ) : (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleVisitClick}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-warm-900 hover:bg-warm-800 text-cream-100 text-sm font-medium rounded-full transition-all"
                    >
                      <ExternalLink size={15} />
                      Visit project
                    </a>
                  )
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-warm-700 border border-warm-900/15 rounded-full hover:border-warm-900/30 hover:text-warm-900 transition-all"
                  >
                    <Github size={15} />
                    Source code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'live'
      ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
      : status === 'development'
        ? 'bg-amber-500/10 text-amber-700 border-amber-500/20'
        : 'bg-warm-600/10 text-warm-700 border-warm-600/20';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full border ${color} uppercase tracking-wider`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
