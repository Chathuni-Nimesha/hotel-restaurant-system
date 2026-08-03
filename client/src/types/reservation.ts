export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  diningArea: string;
  specialRequests: string;
}

export type ReservationFormField = keyof Omit<
  ReservationFormData,
  "specialRequests"
>;

export type ReservationFormErrors = Partial<
  Record<ReservationFormField, string>
>;

export const INITIAL_RESERVATION_FORM: ReservationFormData = {
  fullName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
  diningArea: "",
  specialRequests: "",
};

export const RESERVATION_FIELD_IDS: Record<ReservationFormField, string> = {
  date: "reservation-date",
  time: "reservation-time",
  guests: "reservation-guests",
  diningArea: "reservation-dining-area",
  fullName: "reservation-fullName",
  phone: "reservation-phone",
  email: "reservation-email",
};

export const RESERVATION_VALIDATION_ORDER: ReservationFormField[] = [
  "date",
  "time",
  "guests",
  "diningArea",
  "fullName",
  "phone",
  "email",
];
