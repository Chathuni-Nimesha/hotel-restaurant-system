import type { InputHTMLAttributes } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { cn } from "@/lib/cn";
import { formatDisplayDate } from "@/lib/format";
import { Label } from "./Label";

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
}

export function DatePicker({
  id,
  name,
  label = "Date",
  error,
  hint,
  className,
  value,
  required,
  min,
  onChange,
  ...props
}: DatePickerProps) {
  const inputId = id ?? name ?? "date";
  const displayValue =
    hint ?? formatDisplayDate(typeof value === "string" ? value : "");

  const openPicker = () => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    input?.showPicker?.();
    input?.focus();
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
          type="date"
          value={value}
          min={min}
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
          aria-label="Open calendar"
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-md p-1.5 text-yellow-500 transition hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50"
        >
          <FaCalendarAlt aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <p id={`${inputId}-hint`} className="mt-2 text-sm text-gray-400">
        {displayValue}
      </p>

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
