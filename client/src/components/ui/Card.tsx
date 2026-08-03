import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hover?: boolean;
}

export function Card({
  elevated = false,
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-800 bg-[#111] text-white",
        elevated && "shadow-[var(--shadow-card)]",
        hover &&
          "transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
