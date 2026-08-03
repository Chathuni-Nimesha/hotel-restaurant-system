"use client";

import { useCallback } from "react";
import { scrollToSection } from "@/lib/scroll";

export function useScrollToSection() {
  return useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, []);
}
