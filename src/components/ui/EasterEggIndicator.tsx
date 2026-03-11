import { useMakeover } from '@/context/MakeoverContext';
import { Sparkles, Eye, Lock } from 'lucide-react';

export default function EasterEggIndicator() {
  const { isMakeover, hasDiscovered, toggleMakeover } = useMakeover();

  const handleClick = () => {
    if (hasDiscovered) {
      toggleMakeover();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        type="button"
        onClick={handleClick}
        disabled={!hasDiscovered}
        tabIndex={hasDiscovered ? 0 : -1}
        aria-label={hasDiscovered ? 'Toggle easter egg mode' : 'Easter egg not discovered yet'}
        className={`easter-egg-indicator-btn
          flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg
          transition-all duration-500 ease-out
          ${!hasDiscovered ? 'pointer-events-none' : ''}
          ${isMakeover
            ? 'bg-accent/10 backdrop-blur-sm border-accent/30 animate-fade-in cursor-pointer hover:scale-105'
            : hasDiscovered
              ? 'bg-cream-200 border-cream-400 opacity-60 cursor-pointer hover:opacity-80'
              : 'bg-cream-200 border-cream-400 opacity-40 cursor-not-allowed select-none'
          }
        `}
      >
        {isMakeover ? (
          <>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              easter egg found
            </span>
          </>
        ) : hasDiscovered ? (
          <>
            <Eye className="w-4 h-4 text-warm-600" />
            <span className="text-sm font-medium text-warm-700">
              easter egg not found
            </span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 text-warm-500" />
            <span className="text-sm font-medium text-warm-600">
              easter egg not found
            </span>
          </>
        )}
      </button>
    </div>
  );
}
