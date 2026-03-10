import { useEffect, useState, useMemo } from 'react';
import ParticlesComponent, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function Particles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 40, density: { enable: true } },
        color: { value: ['#C4723A', '#D98B55', '#A85E2D', '#d4a574'] },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.05, max: 0.2 },
          animation: { enable: true, speed: 0.3, startValue: 'random', sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1.5, startValue: 'random', sync: false },
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: { default: 'out' as const },
        },
        links: {
          enable: true,
          distance: 140,
          color: '#C4723A',
          opacity: 0.04,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.12 } },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;

  return (
    <ParticlesComponent
      id="hero-particles"
      options={options}
      className="absolute inset-0 pointer-events-auto"
    />
  );
}
