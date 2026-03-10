import { useEffect, useRef, useState } from 'react';

interface Props {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function TargetCursor({ containerRef }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('mousedown', onDown);
    container.addEventListener('mouseup', onUp);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.15);
      current.current.y = lerp(current.current.y, pos.current.y, 0.15);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%) scale(${pressed ? 0.85 : 1})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('mouseup', onUp);
    };
  }, [containerRef, visible, pressed]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-accent/50 transition-[width,height] duration-200"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
