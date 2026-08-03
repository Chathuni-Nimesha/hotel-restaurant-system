/**
 * Returns today's date as YYYY-MM-DD for native date input min attribute.
 */
export function getTodayIsoDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formats an ISO date string (YYYY-MM-DD) for display.
 */
export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) {
    return "Choose your preferred date";
  }

  const date = new Date(`${isoDate}T00:00:00`);

  return date.toLocaleDateString("en-LK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a 24-hour time string (HH:MM) for display.
 */
export function formatDisplayTime(time: string): string {
  if (!time) {
    return "Choose your preferred time";
  }

  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-LK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
