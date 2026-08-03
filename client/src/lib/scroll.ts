import type { MouseEvent } from "react";
import { NAVBAR_OFFSET_PX } from "@/lib/constants/navigation";

/**
 * Smoothly scrolls to a page section, accounting for the fixed navbar height.
 */
export function scrollToSection(sectionId: string): void {
  const id = sectionId.startsWith("#") ? sectionId.slice(1) : sectionId;
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const top =
    element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

/**
 * Handles in-page anchor navigation with navbar offset.
 */
export function handleNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
): void {
  if (!href.startsWith("#")) {
    return;
  }

  event.preventDefault();
  scrollToSection(href);
  onNavigate?.();
}
