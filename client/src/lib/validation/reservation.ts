import { getTodayIsoDate } from "@/lib/format";
import type {
  ReservationFormData,
  ReservationFormErrors,
  ReservationFormField,
} from "@/types/reservation";
import {
  RESERVATION_FIELD_IDS,
  RESERVATION_VALIDATION_ORDER,
} from "@/types/reservation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+\-()]+$/;

function countPhoneDigits(phone: string): number {
  return phone.replace(/\D/g, "").length;
}

export function validateReservationForm(
  data: ReservationFormData
): ReservationFormErrors {
  const errors: ReservationFormErrors = {};

  if (!data.date) {
    errors.date = "Please select a reservation date.";
  } else if (data.date < getTodayIsoDate()) {
    errors.date = "Reservation date cannot be in the past.";
  }

  if (!data.time) {
    errors.time = "Please select a reservation time.";
  }

  if (!data.guests || data.guests < 1) {
    errors.guests = "At least 1 guest is required.";
  } else if (data.guests > 20) {
    errors.guests = "Maximum 20 guests allowed.";
  }

  if (!data.diningArea.trim()) {
    errors.diningArea = "Please select a dining area.";
  }

  const fullName = data.fullName.trim();
  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  const phone = data.phone.trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Phone may only contain numbers, spaces, +, -, and ().";
  } else if (countPhoneDigits(phone) < 10) {
    errors.phone = "Phone number must contain at least 10 digits.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function getFirstInvalidReservationFieldId(
  errors: ReservationFormErrors
): string | null {
  for (const field of RESERVATION_VALIDATION_ORDER) {
    if (errors[field]) {
      return RESERVATION_FIELD_IDS[field];
    }
  }

  return null;
}

export function clearReservationFieldError(
  errors: ReservationFormErrors,
  field: ReservationFormField
): ReservationFormErrors {
  if (!errors[field]) {
    return errors;
  }

  const nextErrors = { ...errors };
  delete nextErrors[field];
  return nextErrors;
}
