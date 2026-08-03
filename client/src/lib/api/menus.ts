import { API_BASE_URL } from "@/lib/constants/api";
import type { MenuItem, MenusResponse } from "@/types/menu";

export async function fetchMenus(): Promise<MenuItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/menus`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load menu items. Please try again.");
  }

  const data: MenusResponse = await response.json();

  if (!data.success || !Array.isArray(data.menus)) {
    throw new Error("Invalid menu response from server.");
  }

  return data.menus;
}
