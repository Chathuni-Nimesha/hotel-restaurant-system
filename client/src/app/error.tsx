"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-black px-6 text-white"
    >
      <div className="max-w-lg rounded-3xl border border-gray-800 bg-[#111] p-10 text-center shadow-[0_0_40px_rgba(234,179,0,0.08)]">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-yellow-500 uppercase">
          Grand Royal
        </p>
        <h1 className="mb-4 text-4xl font-bold text-yellow-500">
          Something went wrong
        </h1>
        <p className="mb-8 leading-relaxed text-gray-400">
          We encountered an unexpected issue while preparing your experience.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="rounded-xl px-8">
            Retry
          </Button>
          <Link href="/">
            <Button variant="ghost" className="rounded-xl px-8">
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
