export interface Pagination {
  current_page: number;
  next_page?: string;
  previous_page?: string;
  total_pages: number;
  total_entries: number;
  per_page: number;
}

export interface RestaurantDetails {
  name: string;
  category?: string;
  images: {
    original: Array<string>;
    cropped: Array<string>;
  };
  description?: string;
  telephone?: string;
  menus?: Array<{ url: string }>;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  pricing: Array<{ price: number; currency: string; priceString: string }>;
  image: string;
}

export interface MenuSection {
  section_name: string;
  description: string;
  menu_items: Array<MenuItem>;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type CartProducts = { [key: string]: MenuItem & { quantity: number } };

export interface CartState {
  products: CartProducts;
}
