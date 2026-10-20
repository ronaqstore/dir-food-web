export interface PublicArea {
  id: string;
  name: string;
  slug: string;
}

export interface PublicRestaurantCard {
  slug: string;
  name: string;
  cuisines: string[];
  logoUrl: string | null;
  minOrderAmount: number | null; // in paisa
  isOpenNow: boolean;
  availabilityText: string;
  nextOpenAt: string | null;
}

export interface QueryPublicRestaurantsParams {
  areaId?: string;
  cuisine?: string;
  q?: string;
  openNow?: boolean;
  page?: number;
  limit?: number;
}

export interface PublicRestaurantsResponse {
  data: PublicRestaurantCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
