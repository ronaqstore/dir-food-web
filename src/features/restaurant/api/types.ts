export interface DeliveryAreaFee {
  areaId: string;
  name: string;
  deliveryFee: number | null; // in paisa
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
  minOrderAmount: number | null; // in paisa
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
  price: number; // in paisa
}

export interface PublicMenuItem {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price?: number | null; // in paisa (returned from backend API)
  basePrice?: number | null; // in paisa
  originalPrice?: number | null; // in paisa (regular price before deal)
  isDeal?: boolean;
  isAvailable: boolean;
  variants: PublicItemVariant[];
}

export interface PublicMenuCategory {
  id: string;
  name: string;
  items: PublicMenuItem[];
}

export interface RestaurantMenuResponse {
  categories: PublicMenuCategory[];
}
