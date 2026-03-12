import { useMakeover } from '@/context/MakeoverContext';
import { Sparkles } from 'lucide-react';

export default function EasterEggIndicator() {
  const { isMakeover, toggleMakeover } = useMakeover();

  // Only show when makeover mode is active (easter egg has been triggered)
  if (!isMakeover) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        type="button"
        onClick={toggleMakeover}
        tabIndex={0}
        aria-label="Revert to normal view"
        className="easter-egg-indicator-btn
          flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg
          transition-all duration-500 ease-out cursor-pointer
          bg-accent/10 backdrop-blur-sm border-accent/30 animate-fade-in hover:scale-105"
      >
        <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        <span className="text-sm font-medium text-accent">
          easter egg found
        </span>
      </button>
    </div>
  );
}
