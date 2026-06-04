const dishes = [
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
    <section className="bg-black text-white pt-40 pb-10">

      {/* Top Divider */}
      <div className="w-full border-t border-gray-800 mb-4"></div>

      <div className="w-full  px-6 ">

        {/* Section Title */}
        <div className="h-16"></div>

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-12">
            Featured Dishes
          </h2>

          <p className="text-gray-300 text-lg mb-32">
            Discover our chef's premium selections.
          </p>
        </div>
        <div className="h-8 "></div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">


          {dishes.map((dish, index) => (
            <div
              key={index}
              className="
                bg-[#111]
                rounded-2xl
                overflow-hidden
                shadow-lg
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-500
                w-full
              "
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-72 object-cover hover:scale-105 transition duration-700"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {dish.name}
                </h3>

                <p className="text-yellow-500 text-xl font-bold">
                  {dish.price}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Featured;