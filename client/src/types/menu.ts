export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenusResponse {
  success: boolean;
  menus: MenuItem[];
}
