import type { InputHTMLAttributes } from "react";
import { FaClock } from "react-icons/fa";
import { cn } from "@/lib/cn";
import { formatDisplayTime } from "@/lib/format";
import { Label } from "./Label";

export const POPULAR_DINING_TIMES = [
  "12:00",
  "13:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
] as const;

export interface TimePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
  showPopularTimes?: boolean;
  onTimeSelect?: (time: string) => void;
}

export function TimePicker({
  id,
  name,
  label = "Time",
  error,
  hint,
  className,
  value,
  required,
  min = "10:00",
  max = "23:00",
  step = 900,
  showPopularTimes = true,
  onChange,
  onTimeSelect,
  ...props
}: TimePickerProps) {
  const inputId = id ?? name ?? "time";
  const currentValue = typeof value === "string" ? value : "";
  const displayValue = hint ?? formatDisplayTime(currentValue);

  const openPicker = () => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    input?.showPicker?.();
    input?.focus();
  };

  const handlePopularTime = (time: string) => {
    onTimeSelect?.(time);
  };

  return (
    <div className="w-full text-left">
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type="time"
          value={value}
          min={min}
          max={max}
          step={step}
          required={required}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${inputId}-hint${error ? ` ${inputId}-error` : ""}`}
          className={cn(
            "native-picker w-full rounded-xl border border-gray-700 bg-[#0a0a0a] p-4 pr-12 text-white",
            "transition focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={openPicker}
          aria-label="Open time picker"
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-md p-1.5 text-yellow-500 transition hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50"
        >
          <FaClock aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <p id={`${inputId}-hint`} className="mt-2 text-sm text-gray-400">
        {displayValue}
      </p>

      {showPopularTimes && (
        <div className="mt-3">
          <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Popular times
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Popular dining times"
          >
            {POPULAR_DINING_TIMES.map((time) => {
              const isSelected = currentValue === time;

              return (
                <button
                  key={time}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handlePopularTime(time)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm transition duration-300",
                    isSelected
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-gray-700 bg-[#0a0a0a] text-gray-300 hover:border-yellow-500"
                  )}
                >
                  {formatDisplayTime(time)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
