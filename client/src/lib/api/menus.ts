import { API_BASE_URL } from "@/lib/constants/api";
import type { MenuItem, MenusResponse } from "@/types/menu";

export interface MenuMutationPayload {
  name: string;
  category: string;
  price: string | number;
  description: string;
  image: string;
  available: boolean;
}

interface MenuMutationResponse {
  success: boolean;
  message?: string;
  menu?: MenuItem;
}

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

export async function createMenuItem(
  payload: MenuMutationPayload
): Promise<MenuItem> {
  const response = await fetch(`${API_BASE_URL}/api/menus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: MenuMutationResponse = await response.json();

  if (!response.ok || !data.success || !data.menu) {
    throw new Error(data.message ?? "Failed to create menu item.");
  }

  return data.menu;
}

export async function updateMenuItem(
  id: string,
  payload: MenuMutationPayload
): Promise<MenuItem> {
  const response = await fetch(`${API_BASE_URL}/api/menus/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: MenuMutationResponse = await response.json();

  if (!response.ok || !data.success || !data.menu) {
    throw new Error(data.message ?? "Failed to update menu item.");
  }

  return data.menu;
}

export async function deleteMenuItem(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/menus/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  const data: MenuMutationResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message ?? "Failed to delete menu item.");
  }
}
