import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  { src: "/images/gallery1.jpg", alt: "Grand Royal elegant dining room" },
  { src: "/images/gallery2.jpg", alt: "Grand Royal premium table setting" },
  { src: "/images/gallery3.jpg", alt: "Grand Royal luxury lounge area" },
  { src: "/images/gallery4.jpg", alt: "Grand Royal chef special presentation" },
  { src: "/images/gallery5.jpeg", alt: "Grand Royal rooftop dining view" },
  { src: "/images/gallery6.jpg", alt: "Grand Royal private dining experience" },
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
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="group relative h-80 overflow-hidden rounded-3xl border border-gray-800 bg-[#111] transition-all duration-500 hover:border-yellow-500 hover:-translate-y-2"
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
