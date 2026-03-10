import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardSwapProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  onCardClick?: (item: T, index: number) => void;
  width?: number;
  height?: number;
  delay?: number;
  pauseOnHover?: boolean;
}

export default function CardSwap<T>({
  items,
  renderCard,
  onCardClick,
  width = 340,
  height = 420,
  delay = 4000,
  pauseOnHover = true,
}: CardSwapProps<T>) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  const cycleForward = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift()!;
      next.push(front);
      return next;
    });
  }, []);

  const cycleBack = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const back = next.pop()!;
      next.unshift(back);
      return next;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(cycleForward, delay);
    return () => clearInterval(id);
  }, [cycleForward, delay, paused]);

  const offsets = [
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 18, y: -8, rotate: 3, scale: 0.96 },
    { x: 36, y: -16, rotate: 6, scale: 0.92 },
    { x: 50, y: -22, rotate: 8, scale: 0.88 },
  ];

  return (
    <div className="flex items-center gap-10">
      <button
        onClick={cycleBack}
        className="p-2.5 rounded-full border border-warm-900/10 text-warm-600 hover:text-warm-900 hover:border-warm-900/25 hover:bg-cream-200/60 transition-all cursor-pointer"
        aria-label="Previous project"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        className="relative flex items-center justify-center"
        style={{ width, height: height + 40 }}
        onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      >
        <AnimatePresence mode="popLayout">
          {order.map((itemIndex, stackPos) => {
            const offset = offsets[Math.min(stackPos, offsets.length - 1)];
            const item = items[itemIndex];
            const isFront = stackPos === 0;

            return (
              <motion.div
                key={itemIndex}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                animate={{
                  x: offset.x,
                  y: offset.y,
                  rotate: offset.rotate,
                  scale: offset.scale,
                  opacity: 1,
                  zIndex: items.length - stackPos,
                }}
                exit={{ opacity: 0, y: 80, scale: 0.8, rotate: -5 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                  mass: 0.8,
                }}
                onClick={isFront && onCardClick ? () => onCardClick(item, itemIndex) : undefined}
                className="absolute origin-bottom-left"
                style={{
                  width,
                  height,
                  cursor: isFront ? 'pointer' : 'default',
                }}
              >
                {renderCard(item, itemIndex)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={cycleForward}
        className="p-2.5 rounded-full border border-warm-900/10 text-warm-600 hover:text-warm-900 hover:border-warm-900/25 hover:bg-cream-200/60 transition-all cursor-pointer"
        aria-label="Next project"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
