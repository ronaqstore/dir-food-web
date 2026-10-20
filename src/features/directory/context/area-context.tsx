'use client';

import * as React from 'react';
import type { PublicArea } from '../api/types';

interface AreaContextValue {
  selectedArea: PublicArea | null;
  setSelectedArea: (area: PublicArea | null) => void;
  isAreaModalOpen: boolean;
  openAreaModal: () => void;
  closeAreaModal: () => void;
}

const AreaContext = React.createContext<AreaContextValue | null>(null);

const STORAGE_KEY = 'dir_food_selected_area';

function getStoredArea(): PublicArea | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PublicArea) : null;
  } catch {
    return null;
  }
}

export function AreaProvider({ children }: { children: React.ReactNode }) {
  const [selectedArea, setSelectedAreaState] = React.useState<PublicArea | null>(getStoredArea);
  const [isAreaModalOpen, setIsAreaModalOpen] = React.useState(false);

  const setSelectedArea = React.useCallback((area: PublicArea | null) => {
    setSelectedAreaState(area);
    try {
      if (area) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(area));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage failure
    }
  }, []);

  const openAreaModal = React.useCallback(() => setIsAreaModalOpen(true), []);
  const closeAreaModal = React.useCallback(() => setIsAreaModalOpen(false), []);

  const value = React.useMemo(
    () => ({
      selectedArea,
      setSelectedArea,
      isAreaModalOpen,
      openAreaModal,
      closeAreaModal
    }),
    [selectedArea, setSelectedArea, isAreaModalOpen, openAreaModal, closeAreaModal]
  );

  return <AreaContext.Provider value={value}>{children}</AreaContext.Provider>;
}

export function useArea(): AreaContextValue {
  const context = React.useContext(AreaContext);
  if (!context) {
    throw new Error('useArea must be used within an AreaProvider');
  }
  return context;
}
