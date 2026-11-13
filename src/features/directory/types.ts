import type { PublicArea, PublicCity, PublicRestaurantCard } from './api/types';

export type { PublicArea, PublicCity, PublicRestaurantCard };

export interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCuisine: string | undefined;
  onCuisineSelect: (cuisine: string | undefined) => void;
  openNowOnly: boolean;
  onOpenNowToggle: (enabled: boolean) => void;
}

export interface DirectoryViewProps {
  initialCuisine?: string;
  limit?: number;
  showFilters?: boolean;
}

export interface RestaurantCardProps {
  restaurant: PublicRestaurantCard;
}

export interface RestaurantGridProps {
  restaurants?: PublicRestaurantCard[];
  isLoading: boolean;
  onResetFilters?: () => void;
}

export interface AreaContextValue {
  selectedCity: PublicCity | null;
  setSelectedCity: (city: PublicCity | null) => void;
  selectedArea: PublicArea | null;
  setSelectedArea: (area: PublicArea | null) => void;
  isAreaModalOpen: boolean;
  openAreaModal: () => void;
  closeAreaModal: () => void;
}
