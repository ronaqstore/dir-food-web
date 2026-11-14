export interface DeliveryAreaFee {
  areaId: string;
  name: string;
  deliveryFee: number | null;
}

export interface OperatingHoursRange {
  openTime: string;
  closeTime: string;
}

export interface PublicRestaurantProfile {
  slug: string;
  name: string;
  description: string | null;
  cuisines: string[];
  logoUrl: string | null;
  coverUrl: string | null;
  contactPhone: string | null;
  whatsappNumber: string | null;
  addressText: string | null;
  minOrderAmount: number | null;
  isOpenNow: boolean;
  manualStatus: string;
  unavailableNote: string | null;
  availabilityText: string;
  nextOpenAt: string | null;
  todayHours: OperatingHoursRange[];
  deliveryAreas: DeliveryAreaFee[];
}

export interface PublicItemVariant {
  id: string;
  name: string;
  price: number;
}

export interface PublicItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface PublicMenuItem {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price?: number | null;
  basePrice?: number | null;
  originalPrice?: number | null;
  isDeal?: boolean;
  isAvailable: boolean;
  variants: PublicItemVariant[];
  addons?: PublicItemAddon[];
}

export interface PublicMenuCategory {
  id: string;
  name: string;
  items: PublicMenuItem[];
}

export interface RestaurantMenuResponse {
  categories: PublicMenuCategory[];
}
