import type { PublicMenuItem, PublicMenuCategory, PublicRestaurantProfile, DeliveryAreaFee } from './api/types';
import type { CartRestaurant } from '@/features/cart/types';

export interface CategoryNavProps {
  categories: PublicMenuCategory[];
  activeCategoryId?: string;
  onSelectCategory?: (id: string) => void;
}

export interface DealDetailModalProps {
  restaurant: CartRestaurant;
  item: PublicMenuItem | null;
  onClose: () => void;
}

export interface DeliveryFeesModalProps {
  restaurantName: string;
  areas: DeliveryAreaFee[];
  isOpen: boolean;
  onClose: () => void;
}

export interface FeaturedDealsCarouselProps {
  restaurant: CartRestaurant;
  deals: PublicMenuItem[];
  onSelectVariant: (item: PublicMenuItem) => void;
  onOpenDeal: (item: PublicMenuItem) => void;
}

export interface MenuItemCardProps {
  restaurant: CartRestaurant;
  item: PublicMenuItem;
  onSelectVariant: (item: PublicMenuItem) => void;
  onOpenDeal?: (item: PublicMenuItem) => void;
}

export interface StoreHeaderProps {
  restaurant: PublicRestaurantProfile;
}

export interface StorefrontMenuProps {
  restaurant: PublicRestaurantProfile;
  categories: PublicMenuCategory[];
}

export interface VariantModalProps {
  restaurant: CartRestaurant;
  item: PublicMenuItem | null;
  onClose: () => void;
}

export interface ParsedDealItem {
  name: string;
  emoji: string;
  quantityText?: string;
}

export interface ParsedDealDetails {
  items: ParsedDealItem[];
  servingNote?: string;
  rawText: string;
}
