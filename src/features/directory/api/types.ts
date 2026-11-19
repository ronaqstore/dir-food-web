export interface PublicCity {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface PublicArea {
  id: string;
  cityId?: string;
  name: string;
  slug: string;
}

export interface PublicCuisine {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sortOrder: number;
}

export interface PublicRestaurantCard {
  slug: string;
  name: string;
  cuisines: string[];
  logoUrl: string | null;
  minOrderAmount: number | null;
  isOpenNow: boolean;
  availabilityText: string;
  nextOpenAt: string | null;
  hasDeals?: boolean;
}

export interface QueryPublicRestaurantsParams {
  cityId?: string;
  areaId?: string;
  cuisine?: string;
  q?: string;
  openNow?: boolean;
  hasDeals?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface PublicRestaurantsResponse {
  data: PublicRestaurantCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}
