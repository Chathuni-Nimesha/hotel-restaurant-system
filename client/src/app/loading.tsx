import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="sr-only">Loading Grand Royal</p>

      <div className="border-b border-gray-800 bg-black/40 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <div className="hidden gap-6 md:flex">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>

      <div className="relative flex h-[70vh] items-center justify-center px-6">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="relative z-10 mx-auto w-full max-w-3xl space-y-6 text-center">
          <Skeleton className="mx-auto h-12 w-3/4" />
          <Skeleton className="mx-auto h-6 w-2/3" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </div>

      <div className="section-container landing-section space-y-8">
        <Skeleton className="mx-auto h-10 w-64" />
        <div className="grid gap-8 md:grid-cols-3">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
