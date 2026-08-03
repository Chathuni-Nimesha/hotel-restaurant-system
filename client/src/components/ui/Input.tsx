import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Label } from "./Label";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export function Input({
  id,
  label,
  error,
  hideLabel = false,
  className,
  required,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={inputId}
          required={required}
          className={hideLabel ? "sr-only" : undefined}
        >
          {label}
        </Label>
      )}

      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "w-full rounded-xl border border-gray-700 bg-[#0a0a0a] p-4 text-white",
          "placeholder:text-gray-500",
          "transition focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        {...props}
      />

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
