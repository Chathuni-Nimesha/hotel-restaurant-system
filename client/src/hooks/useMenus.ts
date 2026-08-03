import { useCallback, useEffect, useState } from "react";
import { fetchMenus } from "@/lib/api/menus";
import type { MenuItem } from "@/types/menu";

interface UseMenusResult {
  menus: MenuItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMenus(): UseMenusResult {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const items = await fetchMenus();
      setMenus(items);
    } catch (err) {
      setMenus([]);
      setError(
        err instanceof Error ? err.message : "Unable to load menu items."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMenus();
  }, [loadMenus]);

  return {
    menus,
    isLoading,
    error,
    refetch: loadMenus,
  };
}
