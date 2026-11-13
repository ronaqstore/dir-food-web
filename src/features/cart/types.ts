export interface CartRestaurant {
  slug: string;
  name: string;
  logoUrl?: string | null;
  minOrderAmount?: number | null;
}

export interface CartItem {
  key: string;
  itemId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  unitPrice: number;
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
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  isAvailable: boolean;
}

export interface ValidatedDeliveryInfo {
  areaId: string;
  areaName: string;
  deliveryFee: number | null;
  deliveryFeeStatus: DeliveryFeeStatus;
}

export interface ValidatedCartRestaurant {
  id: string;
  name: string;
  slug: string;
  whatsappNumber: string;
  minOrderAmount: number | null;
  isOpenNow: boolean;
  availabilityText: string;
  nextOpenAt: string | null;
}

export interface ValidateCartResponse {
  restaurant: ValidatedCartRestaurant;
  lines: ValidatedCartLine[];
  subtotal: number;
  minOrderAmount: number | null;
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

export interface AddItemPayload {
  restaurant: CartRestaurant;
  item: {
    id: string;
    name: string;
    imageUrl?: string | null;
    price: number;
  };
  variant?: {
    id: string;
    name: string;
    price: number;
  };
  quantity?: number;
}

export interface CartContextValue {
  restaurant: CartRestaurant | null;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addItem: (payload: AddItemPayload) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string, variantId?: string) => number;
  pendingConflict: AddItemPayload | null;
  resolveConflict: (acceptNew: boolean) => void;
}

export interface CartAreaCardProps {
  delivery?: ValidatedDeliveryInfo | null;
}

export interface CartMinOrderAlertProps {
  subtotal: number;
  minOrderAmount: number | null;
  areaName?: string | null;
}

export interface CartSummaryProps {
  subtotal: number;
  minOrderAmount: number | null;
  delivery?: ValidatedDeliveryInfo | null;
  restaurant?: ValidatedCartRestaurant | null;
  isValidating?: boolean;
  hasErrors?: boolean;
}

export interface CartValidationBannerProps {
  restaurant?: ValidatedCartRestaurant | null;
  problems?: string[];
}
