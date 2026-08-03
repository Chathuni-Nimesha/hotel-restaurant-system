import { Card } from "@/components/ui/Card";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FeaturedDish {
  name: string;
  image: string;
  price: string;
}

const dishes: FeaturedDish[] = [
  {
    name: "Grilled Steak",
    image: "/images/steak food.jpg",
    price: "$45",
  },
  {
    name: "Luxury Pasta",
    image: "/images/pasta.jpg",
    price: "$32",
  },
  {
    name: "Seafood Special",
    image: "/images/seafood dish.jpg",
    price: "$50",
  },
];

const Featured = () => {
  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="landing-section bg-black text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <SectionHeading
          id="featured-heading"
          title="Featured Dishes"
          description="Discover our chef's premium selections."
          className="section-heading-gap"
          as="h2"
        />

        <ul
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {dishes.map((dish) => (
            <li key={dish.name}>
              <Card
                hover
                elevated
                className="group overflow-hidden p-0 transition-transform duration-500"
              >
                <article aria-label={dish.name}>
                  <div className="relative h-64 overflow-hidden md:h-72">
                    <OptimizedImage
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-semibold">{dish.name}</h3>
                    <p className="text-xl font-bold text-yellow-500">
                      <span className="sr-only">Price: </span>
                      {dish.price}
                    </p>
                  </div>
                </article>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Featured;
