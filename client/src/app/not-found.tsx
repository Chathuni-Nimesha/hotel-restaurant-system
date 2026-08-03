import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-black px-6 text-white"
    >
      <div className="max-w-lg rounded-3xl border border-gray-800 bg-[#111] p-10 text-center shadow-[0_0_40px_rgba(234,179,0,0.08)]">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-yellow-500 uppercase">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold text-yellow-500">Page Not Found</h1>
        <p className="mb-8 leading-relaxed text-gray-400">
          The page you are looking for may have moved or no longer exists.
          Return to Grand Royal to continue your luxury dining experience.
        </p>

        <Link href="/">
          <Button className="rounded-xl px-8">Back Home</Button>
        </Link>
      </div>
    </main>
  );
}
