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

export interface OrderIntentLine {
  name: string;
  variant: string | null;
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
  isLoading: boolean;
  minOrderAmount: number | null;
  subtotal: number;
  restaurantOpen: boolean;
  areaSelected: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export interface CheckoutOrderSummaryProps {
  deliveryFee: number | null;
  isFreeDelivery: boolean;
}
