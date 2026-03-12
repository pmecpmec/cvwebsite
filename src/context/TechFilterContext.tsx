import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface TechFilterContextType {
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  clearFilter: () => void;
}

const TechFilterContext = createContext<TechFilterContextType | undefined>(undefined);

export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const clearFilter = useCallback(() => {
    setSelectedTech(null);
  }, []);

  return (
    <TechFilterContext.Provider value={{ selectedTech, setSelectedTech, clearFilter }}>
      {children}
    </TechFilterContext.Provider>
  );
}

export function useTechFilter() {
  const context = useContext(TechFilterContext);
  if (!context) {
    throw new Error('useTechFilter must be used within TechFilterProvider');
  }
  return context;
}
