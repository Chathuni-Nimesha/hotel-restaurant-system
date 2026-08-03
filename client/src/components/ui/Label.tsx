import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  children,
  className,
  required = false,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn("mb-1 block text-sm font-medium text-gray-200", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-yellow-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
