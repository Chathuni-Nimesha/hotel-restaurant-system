"use client";

import { Button } from "@/components/ui/Button";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="mb-6 text-5xl leading-tight font-bold text-yellow-500 md:text-6xl lg:text-7xl">
          Luxury Dining Experience
        </h1>

        <p className="mb-8 text-lg text-white md:text-2xl">
          Experience world-class cuisine and unforgettable moments.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => scrollToSection("reservation")}
            className="rounded-full px-10 py-4 shadow-lg transition duration-300 hover:scale-[1.03]"
          >
            Book a Table
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollToSection("menu")}
            className="rounded-full px-10 py-4 transition duration-300 hover:scale-[1.03]"
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
