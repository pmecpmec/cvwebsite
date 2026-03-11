import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface MakeoverContextType {
  isMakeover: boolean;
  hasDiscovered: boolean;
  toggleMakeover: () => void;
}

const MakeoverContext = createContext<MakeoverContextType | undefined>(undefined);

export function MakeoverProvider({ children }: { children: ReactNode }) {
  const [isMakeover, setIsMakeover] = useState(false);

  const [hasDiscovered, setHasDiscovered] = useState(() => {
    return localStorage.getItem('easterEggDiscovered') === 'true';
  });

  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    if (isMakeover) {
      htmlEl.classList.add('makeover-mode');
      bodyEl.classList.add('makeover-mode');

      if (!hasDiscovered) {
        setHasDiscovered(true);
        localStorage.setItem('easterEggDiscovered', 'true');
      }
    } else {
      htmlEl.classList.remove('makeover-mode');
      bodyEl.classList.remove('makeover-mode');
    }
  }, [isMakeover, hasDiscovered]);

  const toggleMakeover = () => {
    if (hasDiscovered || !isMakeover) {
      setIsMakeover((prev) => !prev);
    }
  };

  return (
    <MakeoverContext.Provider value={{ isMakeover, hasDiscovered, toggleMakeover }}>
      {children}
    </MakeoverContext.Provider>
  );
}

export function useMakeover() {
  const context = useContext(MakeoverContext);
  if (!context) {
    throw new Error('useMakeover must be used within MakeoverProvider');
  }
  return context;
}
