export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reservations", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

export const NAVBAR_OFFSET_PX = 88;
