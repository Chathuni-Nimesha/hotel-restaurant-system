"use client";

import { Button } from "@/components/ui/Button";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const About = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="landing-section bg-[#0a0a0a] text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <SectionHeading
          id="about-heading"
          title="About Grand Royal"
          description="Grand Royal offers an exceptional dining experience with premium ingredients, world-class chefs, and luxurious surroundings designed to create unforgettable memories."
          className="section-heading-gap"
          titleClassName="md:text-6xl"
        />

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <figure className="relative h-[320px] overflow-hidden rounded-2xl shadow-2xl sm:h-[400px] md:h-[500px]">
            <OptimizedImage
              src="/images/Interior.jpeg"
              alt="Elegant interior dining room at Grand Royal restaurant"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-[1.02]"
            />
          </figure>

          <div>
            <h3 className="mb-6 text-3xl font-bold md:text-4xl">
              Luxury Dining Since 2010
            </h3>

            <p className="mb-6 leading-relaxed text-gray-300">
              We combine modern culinary techniques with timeless hospitality to
              provide guests with a truly premium restaurant experience.
            </p>

            <p className="mb-8 leading-relaxed text-gray-300">
              Whether you&apos;re celebrating a special occasion, hosting a
              business dinner, or enjoying a casual evening with family and
              friends, our team ensures every visit is memorable.
            </p>

            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
