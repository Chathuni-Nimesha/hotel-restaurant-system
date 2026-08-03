"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createReservation } from "@/lib/api/reservations";
import { getTodayIsoDate } from "@/lib/format";
import {
  clearReservationFieldError,
  getFirstInvalidReservationFieldId,
  validateReservationForm,
} from "@/lib/validation/reservation";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TimePicker } from "@/components/ui/TimePicker";
import { cn } from "@/lib/cn";
import {
  INITIAL_RESERVATION_FORM,
  RESERVATION_FIELD_IDS,
  type ReservationFormData,
  type ReservationFormErrors,
  type ReservationFormField,
} from "@/types/reservation";

const diningAreas = [
  "Indoor Dining",
  "Rooftop Terrace",
  "Private VIP Room",
  "Garden Dining",
] as const;

const SUCCESS_VISIBLE_MS = 5000;
const SUCCESS_EXIT_MS = 4500;

const Reservation = () => {
  const [formData, setFormData] = useState<ReservationFormData>(
    INITIAL_RESERVATION_FORM
  );
  const [errors, setErrors] = useState<ReservationFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [successExiting, setSuccessExiting] = useState(false);

  const guestOptions = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const count = index + 1;
        return {
          value: String(count),
          label: count === 1 ? "1 Guest" : `${count} Guests`,
        };
      }),
    []
  );

  useEffect(() => {
    if (!successVisible) {
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setSuccessExiting(true);
    }, SUCCESS_EXIT_MS);

    const hideTimer = window.setTimeout(() => {
      setSuccessVisible(false);
      setSuccessExiting(false);
    }, SUCCESS_VISIBLE_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [successVisible]);

  const clearFieldError = useCallback((field: ReservationFormField) => {
    setErrors((current) => clearReservationFieldError(current, field));
  }, []);

  const updateField = useCallback(
    (field: ReservationFormField, value: string | number) => {
      setFormData((current) => ({ ...current, [field]: value }));
      clearFieldError(field);
      setSubmitError(null);
    },
    [clearFieldError]
  );

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "guests") {
      updateField("guests", Number(value));
      return;
    }

    updateField(name as ReservationFormField, value);
  };

  const selectDiningArea = (area: string) => {
    updateField("diningArea", area);
  };

  const focusFirstInvalidField = (validationErrors: ReservationFormErrors) => {
    const fieldId = getFirstInvalidReservationFieldId(validationErrors);
    if (!fieldId) {
      return;
    }

    document.getElementById(fieldId)?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError(null);

    const validationErrors = validateReservationForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      focusFirstInvalidField(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await createReservation(formData);
      setFormData(INITIAL_RESERVATION_FORM);
      setErrors({});
      setSuccessVisible(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your reservation. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const retrySubmit = () => {
    setSubmitError(null);
  };

  return (
    <section
      id="reservation"
      aria-labelledby="reservation-heading"
      className="landing-section bg-gradient-to-b from-black via-[#111] to-black text-white"
    >
      <div className="section-container max-w-[1400px]">
        <div
          className="section-divider landing-section-divider"
          aria-hidden="true"
        />

        <header className="section-heading-gap text-center">
          <h2
            id="reservation-heading"
            className="mb-4 text-5xl font-bold text-yellow-500 md:text-6xl"
          >
            Reserve Your Table
          </h2>
          <p className="text-lg text-gray-300">
            Experience luxury dining at Grand Royal.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-gray-800 bg-[#111] p-6 shadow-[0_0_40px_rgba(234,179,0.08)] sm:p-8 lg:p-10"
            aria-label="Reservation form"
          >
            <h3 className="mb-8 text-3xl font-bold">Reservation Details</h3>

            {successVisible && (
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  "mb-6 rounded-xl border border-green-700/50 bg-green-950/40 px-5 py-4 text-left",
                  successExiting
                    ? "reservation-feedback-exit"
                    : "reservation-feedback"
                )}
              >
                <p className="font-semibold text-green-300">
                  ✓ Reservation Successfully Submitted
                </p>
                <p className="mt-1 text-sm text-green-200/90">
                  We look forward to welcoming you.
                </p>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 rounded-xl border border-red-800/60 bg-red-950/30 p-5 text-left"
              >
                <p className="text-red-300">
                  Unable to submit your reservation.
                  <br />
                  Please try again.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={retrySubmit}
                >
                  Try Again
                </Button>
              </div>
            )}

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <DatePicker
                id={RESERVATION_FIELD_IDS.date}
                name="date"
                label="Date"
                value={formData.date}
                min={getTodayIsoDate()}
                error={errors.date}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />

              <TimePicker
                id={RESERVATION_FIELD_IDS.time}
                name="time"
                label="Time"
                value={formData.time}
                error={errors.time}
                onChange={handleInputChange}
                onTimeSelect={(time) => updateField("time", time)}
                disabled={isSubmitting}
                required
              />

              <Select
                id={RESERVATION_FIELD_IDS.guests}
                name="guests"
                label="Guests"
                value={String(formData.guests)}
                options={guestOptions}
                error={errors.guests}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <fieldset className="mb-10">
              <legend className="mb-6 text-xl font-bold text-yellow-500">
                Select Dining Area
              </legend>

              <div
                className={cn(
                  "grid grid-cols-1 gap-4 sm:grid-cols-2",
                  errors.diningArea && "rounded-xl border border-red-500 p-3"
                )}
                role="group"
                aria-describedby={
                  errors.diningArea ? "reservation-dining-area-error" : undefined
                }
              >
                {diningAreas.map((area, index) => (
                  <button
                    key={area}
                    id={
                      index === 0 ? RESERVATION_FIELD_IDS.diningArea : undefined
                    }
                    type="button"
                    aria-pressed={formData.diningArea === area}
                    disabled={isSubmitting}
                    onClick={() => selectDiningArea(area)}
                    className={cn(
                      "w-full rounded-xl border p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50",
                      formData.diningArea === area
                        ? "border-yellow-500 bg-yellow-500 text-black"
                        : "border-gray-700 bg-[#0a0a0a] text-white hover:border-yellow-500"
                    )}
                  >
                    {area}
                  </button>
                ))}
              </div>

              {errors.diningArea && (
                <p
                  id="reservation-dining-area-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.diningArea}
                </p>
              )}
            </fieldset>

            <h3 className="mb-6 text-xl font-bold text-yellow-500">
              Guest Information
            </h3>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                id={RESERVATION_FIELD_IDS.fullName}
                name="fullName"
                type="text"
                label="Full Name"
                placeholder="Full Name"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                autoComplete="name"
                required
              />

              <Input
                id={RESERVATION_FIELD_IDS.phone}
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="Phone Number"
                value={formData.phone}
                error={errors.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                autoComplete="tel"
                required
              />

              <Input
                id={RESERVATION_FIELD_IDS.email}
                name="email"
                type="email"
                label="Email Address"
                placeholder="Email Address"
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                autoComplete="email"
                className="md:col-span-2"
                required
              />
            </div>

            <Textarea
              name="specialRequests"
              label="Special Requests"
              placeholder="Special Requests (optional)"
              rows={5}
              value={formData.specialRequests}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="mb-8"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              className="rounded-xl py-4"
            >
              Reserve Table
            </Button>
          </form>

          <aside className="rounded-3xl border border-gray-800 bg-[#111] p-6 shadow-[0_0_40px_rgba(234,179,8,0.08)] sm:p-8 lg:p-10">
            <h3 className="mb-8 text-3xl font-bold text-yellow-500">
              Available Tables
            </h3>

            <div className="space-y-6">
              <div className="rounded-xl border border-gray-700 p-5">
                <h4 className="text-lg font-bold">Window Table</h4>
                <p className="text-gray-400">Capacity: 2 Guests</p>
                <p className="mt-2 text-green-500">Available</p>
              </div>

              <div className="rounded-xl border border-gray-700 p-5">
                <h4 className="text-lg font-bold">Family Table</h4>
                <p className="text-gray-400">Capacity: 6 Guests</p>
                <p className="mt-2 text-yellow-500">2 Tables Left</p>
              </div>

              <div className="rounded-xl border border-gray-700 p-5">
                <h4 className="text-lg font-bold">VIP Dining Room</h4>
                <p className="text-gray-400">Capacity: 8 Guests</p>
                <p className="mt-2 text-green-500">Available</p>
              </div>

              <div className="rounded-xl border border-gray-700 p-5">
                <h4 className="text-lg font-bold">Rooftop Terrace</h4>
                <p className="text-gray-400">Capacity: 4 Guests</p>
                <p className="mt-2 text-green-500">Available</p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-800 pt-8">
              <h4 className="mb-5 text-xl font-bold text-yellow-500">
                Premium Benefits
              </h4>

              <div className="space-y-4 text-gray-300">
                <p>✓ Instant Confirmation</p>
                <p>✓ Priority VIP Seating</p>
                <p>✓ Complimentary Welcome Drink</p>
                <p>✓ Personalized Dining Experience</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
