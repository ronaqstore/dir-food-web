export interface CartRestaurant {
  slug: string;
  name: string;
  logoUrl?: string | null;
  minOrderAmount?: number | null; // in paisa
}

export interface CartItem {
  key: string; // `${itemId}:${variantId || 'base'}`
  itemId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  unitPrice: number; // in paisa
  quantity: number;
  imageUrl?: string | null;
}

export interface CartState {
  restaurant: CartRestaurant | null;
  items: CartItem[];
}

export type DeliveryFeeStatus = 'KNOWN' | 'TO_BE_CONFIRMED';

export interface ValidatedCartLine {
  menuItemId: string;
  variantId: string | null;
  name: string;
  variantName: string | null;
  unitPrice: number; // in paisa
  quantity: number;
  lineTotal: number; // in paisa
  isAvailable: boolean;
}

export interface ValidatedDeliveryInfo {
  areaId: string;
  areaName: string;
  deliveryFee: number | null; // in paisa
  deliveryFeeStatus: DeliveryFeeStatus;
}

export interface ValidatedCartRestaurant {
  id: string;
  name: string;
  slug: string;
  whatsappNumber: string;
  minOrderAmount: number | null; // in paisa (effective for area or fallback)
  isOpenNow: boolean;
  availabilityText: string;
  nextOpenAt: string | null;
}

export interface ValidateCartResponse {
  restaurant: ValidatedCartRestaurant;
  lines: ValidatedCartLine[];
  subtotal: number; // in paisa
  minOrderAmount: number | null; // in paisa
  delivery: ValidatedDeliveryInfo | null;
  problems: string[];
}

export interface ValidateCartRequest {
  restaurantSlug: string;
  items: Array<{
    menuItemId: string;
    variantId?: string | null;
    quantity: number;
  }>;
  deliveryAreaId?: string | null;
}
