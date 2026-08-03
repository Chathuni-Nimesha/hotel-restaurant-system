"use client";

import { useCallback, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants/site";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { handleNavClick } from "@/lib/scroll";

const navLinkClassName =
  "rounded-md px-2 py-1 text-lg font-medium text-white transition duration-300 hover:text-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((open) => !open);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/40 text-white backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="text-3xl font-bold text-yellow-500 transition duration-300 hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 rounded-md"
          onClick={(event) => handleNavClick(event, "#home", closeMobileMenu)}
        >
          {SITE.name}
        </a>

        <ul className="hidden items-center gap-10 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={navLinkClassName}
                onClick={(event) =>
                  handleNavClick(event, link.href, closeMobileMenu)
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white transition hover:text-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="h-6 w-6" aria-hidden="true" />
          ) : (
            <FaBars className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        id="mobile-nav-menu"
        className={cn(
          "border-t border-gray-800 bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden",
          isMobileMenuOpen
            ? "visible max-h-96 opacity-100"
            : "invisible max-h-0 overflow-hidden opacity-0"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="flex flex-col gap-1 px-6 py-4" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  navLinkClassName,
                  "block w-full py-3 text-base"
                )}
                onClick={(event) =>
                  handleNavClick(event, link.href, closeMobileMenu)
                }
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
