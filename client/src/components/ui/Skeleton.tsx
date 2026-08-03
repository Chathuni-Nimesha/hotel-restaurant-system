import { cn } from "@/lib/cn";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-xl bg-gray-800/80",
        className
      )}
    />
  );
}

export function MenuCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111]"
      aria-hidden="true"
    >
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="flex items-center justify-between p-5">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <MenuCardSkeleton key={index} />
      ))}
    </div>
  );
}
