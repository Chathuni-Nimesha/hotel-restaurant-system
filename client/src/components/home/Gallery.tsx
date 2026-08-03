import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpeg",
  "/images/gallery6.jpg",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="landing-section bg-[#0a0a0a] text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <SectionHeading
          id="gallery-heading"
          title="Luxury Experience"
          description="Discover elegant spaces, premium hospitality, and unforgettable moments."
          className="section-heading-gap"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl border border-gray-800 bg-[#111] transition-all duration-500 hover:border-yellow-500 hover:-translate-y-2"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
