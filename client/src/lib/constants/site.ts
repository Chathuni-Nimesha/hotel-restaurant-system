const DEFAULT_SITE_URL = "https://grandroyal.example.com";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export const SITE = {
  name: "Grand Royal",
  title: "Grand Royal | Luxury Dining & Reservations",
  description:
    "Experience world-class cuisine, premium hospitality, and unforgettable moments at Grand Royal fine dining restaurant in Colombo, Sri Lanka.",
  locale: "en_LK",
  applicationName: "Grand Royal",
  authors: [{ name: "Chathuni Nimesha", url: DEFAULT_SITE_URL }],
  keywords: [
    "Grand Royal",
    "luxury dining",
    "fine dining",
    "restaurant Colombo",
    "hotel restaurant",
    "table reservation",
    "premium hospitality",
    "Sri Lanka restaurant",
  ],
  ogImage: {
    url: "/images/hero.jpg",
    width: 1200,
    height: 630,
    alt: "Grand Royal luxury dining experience",
  },
  contact: {
    address: "123 Luxury Avenue, Colombo, Sri Lanka",
    phone: "+94 77 123 4567",
    email: "info@grandroyal.com",
    hours: "Monday – Sunday, 10:00 AM – 11:00 PM",
  },
} as const;
