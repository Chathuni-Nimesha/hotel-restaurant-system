import type { MenuItem } from "@/types/menu";

const CATEGORY_ORDER = [
  "Main Courses",
  "Desserts",
  "Signature Drinks",
  "Fast Food",
  "Appetizers",
  "Beverages",
];

export interface MenuCategoryGroup {
  category: string;
  items: MenuItem[];
}

export function formatMenuPrice(price: number): string {
  const isWholeNumber = price === Math.trunc(price);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function groupMenusByCategory(menus: MenuItem[]): MenuCategoryGroup[] {
  const availableMenus = menus.filter((menu) => menu.available);
  const grouped = new Map<string, MenuItem[]>();

  for (const menu of availableMenus) {
    const items = grouped.get(menu.category) ?? [];
    items.push(menu);
    grouped.set(menu.category, items);
  }

  const categories = Array.from(grouped.keys()).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b);
    }

    if (indexA === -1) {
      return 1;
    }

    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });

  return categories.map((category) => ({
    category,
    items: grouped.get(category) ?? [],
  }));
}

export const MENU_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='640' viewBox='0 0 800 640'%3E%3Crect width='800' height='640' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23d4af37' font-family='Arial,sans-serif' font-size='28'%3EGrand Royal%3C/text%3E%3C/svg%3E";
