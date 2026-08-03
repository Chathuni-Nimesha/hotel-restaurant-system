import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Label } from "./Label";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  id,
  label,
  error,
  hideLabel = false,
  options,
  placeholder,
  className,
  required,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={selectId}
          required={required}
          className={hideLabel ? "sr-only" : undefined}
        >
          {label}
        </Label>
      )}

      <select
        id={selectId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={cn(
          "w-full rounded-xl border border-gray-700 bg-[#0a0a0a] p-4 text-white",
          "transition focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p
          id={`${selectId}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
