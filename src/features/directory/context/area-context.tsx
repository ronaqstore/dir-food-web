'use client';

import * as React from 'react';
import type { PublicArea, PublicCity } from '../api/types';

interface AreaContextValue {
  selectedCity: PublicCity | null;
  setSelectedCity: (city: PublicCity | null) => void;
  selectedArea: PublicArea | null;
  setSelectedArea: (area: PublicArea | null) => void;
  isAreaModalOpen: boolean;
  openAreaModal: () => void;
  closeAreaModal: () => void;
}

const AreaContext = React.createContext<AreaContextValue | null>(null);

const STORAGE_KEY_CITY = 'dir_food_selected_city';
const STORAGE_KEY_AREA = 'dir_food_selected_area';

function getStoredCity(): PublicCity | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CITY);
    return stored ? (JSON.parse(stored) as PublicCity) : null;
  } catch {
    return null;
  }
}

function getStoredArea(): PublicArea | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_AREA);
    return stored ? (JSON.parse(stored) as PublicArea) : null;
  } catch {
    return null;
  }
}

export function AreaProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = React.useState<PublicCity | null>(null);
  const [selectedArea, setSelectedAreaState] = React.useState<PublicArea | null>(null);
  const [isAreaModalOpen, setIsAreaModalOpen] = React.useState(false);

  React.useEffect(() => {
    const storedCity = getStoredCity();
    if (storedCity) {
      setSelectedCityState(storedCity);
    }
    const storedArea = getStoredArea();
    if (storedArea) {
      setSelectedAreaState(storedArea);
    }
  }, []);

  const setSelectedCity = React.useCallback((city: PublicCity | null) => {
    setSelectedCityState(city);
    try {
      if (city) {
        localStorage.setItem(STORAGE_KEY_CITY, JSON.stringify(city));
      } else {
        localStorage.removeItem(STORAGE_KEY_CITY);
      }
    } catch {
      // ignore
    }
  }, []);

  const setSelectedArea = React.useCallback((area: PublicArea | null) => {
    setSelectedAreaState(area);
    try {
      if (area) {
        localStorage.setItem(STORAGE_KEY_AREA, JSON.stringify(area));
      } else {
        localStorage.removeItem(STORAGE_KEY_AREA);
      }
    } catch {
      // ignore storage failure
    }
  }, []);

  const openAreaModal = React.useCallback(() => setIsAreaModalOpen(true), []);
  const closeAreaModal = React.useCallback(() => setIsAreaModalOpen(false), []);

  const value = React.useMemo(
    () => ({
      selectedCity,
      setSelectedCity,
      selectedArea,
      setSelectedArea,
      isAreaModalOpen,
      openAreaModal,
      closeAreaModal
    }),
    [
      selectedCity,
      setSelectedCity,
      selectedArea,
      setSelectedArea,
      isAreaModalOpen,
      openAreaModal,
      closeAreaModal
    ]
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
