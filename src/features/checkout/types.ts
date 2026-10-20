export interface CreateOrderIntentCustomer {
  name?: string;
  phone?: string;
}

export interface CreateOrderIntentDelivery {
  areaId: string;
  landmark: string;
  directions?: string;
  mapPin?: {
    lat: number;
    lng: number;
  };
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
  expectedSubtotal: number; // in paisa
}

export interface OrderIntentLine {
  name: string;
  variant: string | null;
  unitPrice: number; // in paisa
  quantity: number;
  lineTotal: number; // in paisa
}

export interface OrderIntentResponse {
  reference: string;
  status: string;
  restaurant: {
    name: string;
  };
  items: OrderIntentLine[];
  subtotal: number; // in paisa
  delivery: {
    status: string;
    fee: number | null; // in paisa
    areaName: string;
    landmark: string;
  };
  message: string;
  whatsappUrl: string;
  expiresAt: string;
  notice: string;
}
