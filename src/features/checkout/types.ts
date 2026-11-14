import type { FormEvent } from 'react';
import type { CartItem, CartRestaurant, ValidatedDeliveryInfo } from '@/features/cart/types';

export interface CreateOrderIntentCustomer {
  name?: string;
  phone?: string;
}

export interface OrderIntentMapPin {
  lat: number;
  lng: number;
}

export interface CreateOrderIntentDelivery {
  areaId: string;
  landmark: string;
  directions?: string;
  mapPin?: OrderIntentMapPin;
}

export interface CreateOrderIntentItem {
  menuItemId: string;
  variantId?: string | null;
  addonIds?: string[];
  quantity: number;
}

export interface CreateOrderIntentPayload {
  clientRequestId: string;
  restaurantSlug: string;
  items: CreateOrderIntentItem[];
  customer?: CreateOrderIntentCustomer;
  delivery: CreateOrderIntentDelivery;
  expectedSubtotal: number;
}

export interface OrderIntentLineAddon {
  name: string;
  price: number;
}

export interface OrderIntentLine {
  name: string;
  variant: string | null;
  addons?: OrderIntentLineAddon[];
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderIntentRestaurant {
  name: string;
}

export interface OrderIntentDeliveryDetails {
  status: string;
  fee: number | null;
  areaName: string;
  landmark: string;
}

export interface OrderIntentResponse {
  reference: string;
  status: string;
  restaurant: OrderIntentRestaurant;
  items: OrderIntentLine[];
  subtotal: number;
  delivery: OrderIntentDeliveryDetails;
  message: string;
  whatsappUrl: string;
  expiresAt: string;
  notice: string;
}

export interface WhatsAppOpenedResponse {
  status: string;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  landmark: string;
  directions: string;
}

export interface CheckoutContactFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  disabled?: boolean;
}

export interface CheckoutOrderSummaryProps {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
  delivery?: ValidatedDeliveryInfo | null;
  isSubmitting: boolean;
  isValidToSubmit: boolean;
  onSubmit: (e: FormEvent) => void;
}

export interface OrderPageParams {
  ref: string;
}

export interface OrderPageProps {
  params: Promise<OrderPageParams>;
}

export interface OrderStatusViewProps {
  refCode?: string;
}
