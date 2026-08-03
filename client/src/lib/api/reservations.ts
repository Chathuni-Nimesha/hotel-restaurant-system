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

interface ReservationRecord {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  diningArea: string;
  specialRequests?: string;
  status: string;
  reservationNumber?: string;
}

interface ReservationsResponse {
  success: boolean;
  message?: string;
  reservations?: ReservationRecord[];
  reservation?: ReservationRecord;
}

export interface ReservationUpdatePayload {
  fullName: string;
  email: string;
  phone: string;
  guests: string | number;
  status: string;
}

interface CreateReservationResponse {
  success: boolean;
  message?: string;
  reservation?: ReservationRecord;
}

export async function fetchReservations(): Promise<ReservationRecord[]> {
  const response = await fetch(`${API_BASE_URL}/api/reservations`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data: ReservationsResponse = await response.json();

  if (!response.ok || !data.success || !Array.isArray(data.reservations)) {
    throw new Error(data.message ?? "Unable to load reservations.");
  }

  return data.reservations;
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

export async function updateReservationRecord(
  id: string,
  payload: ReservationUpdatePayload
): Promise<ReservationRecord> {
  const response = await fetch(`${API_BASE_URL}/api/reservations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: ReservationsResponse = await response.json();

  if (!response.ok || !data.success || !data.reservation) {
    throw new Error(data.message ?? "Failed to update reservation.");
  }

  return data.reservation;
}

export async function deleteReservationRecord(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/reservations/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  const data: ReservationsResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message ?? "Failed to delete reservation.");
  }
}

export type { ReservationRecord };
