import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Testimonial {
  name: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Smith",
    image: "/images/client1.jpeg",
    review:
      "The food was exceptional and the atmosphere was truly luxurious.",
  },
  {
    name: "Sarah Wilson",
    image: "/images/client2.jpeg",
    review:
      "Excellent service, premium dining experience, and unforgettable memories.",
  },
  {
    name: "Michael Brown",
    image: "/images/client3.jpeg",
    review:
      "One of the finest restaurants I have ever visited. Highly recommended.",
  },
];

function StarRating() {
  return (
    <div
      className="mb-4 text-yellow-500"
      role="img"
      aria-label="5 out of 5 stars"
    >
      <span aria-hidden="true">★★★★★</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="landing-section bg-[#0a0a0a] text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <SectionHeading
          id="testimonials-heading"
          title="What Our Guests Say"
          description="Experiences shared by our valued guests."
          className="section-heading-gap"
        />

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
          {testimonials.map((item) => (
            <li key={item.name}>
              <Card hover elevated className="h-full rounded-3xl p-8">
                <article aria-label={`Review by ${item.name}`}>
                  <StarRating />

                  <blockquote className="mb-6 leading-relaxed text-gray-300">
                    <p>&ldquo;{item.review}&rdquo;</p>
                  </blockquote>

                  <footer className="mt-6 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 rounded-full border-2 border-yellow-500 object-cover"
                    />

                    <div>
                      <cite className="not-italic">
                        <p className="font-bold text-white">{item.name}</p>
                      </cite>
                      <p className="text-sm text-gray-400">Verified Guest</p>
                    </div>
                  </footer>
                </article>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
