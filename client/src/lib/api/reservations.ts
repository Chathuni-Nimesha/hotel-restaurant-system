import { API_BASE_URL } from "@/lib/constants/api";
import type { ReservationFormData } from "@/types/reservation";

interface CreateReservationPayload {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  diningArea: string;
  specialRequests?: string;
}

interface CreateReservationResponse {
  success: boolean;
  message?: string;
  reservation?: unknown;
}

export async function createReservation(
  data: ReservationFormData
): Promise<CreateReservationResponse> {
  const payload: CreateReservationPayload = {
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    date: data.date,
    time: data.time,
    guests: data.guests,
    diningArea: data.diningArea,
    specialRequests: data.specialRequests.trim() || undefined,
  };

  const response = await fetch(`${API_BASE_URL}/api/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: CreateReservationResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ?? "Unable to submit your reservation. Please try again."
    );
  }

  return result;
}
