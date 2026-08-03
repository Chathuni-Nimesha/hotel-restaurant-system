import { cn } from "@/lib/cn";

export interface SpinnerProps {
  className?: string;
  size?: "sm" | "md";
}

export function Spinner({ className, size = "sm" }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        size === "sm" && "h-4 w-4",
        size === "md" && "h-5 w-5",
        className
      )}
    />
  );
}
