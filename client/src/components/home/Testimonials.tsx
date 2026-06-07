const testimonials = [
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

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24">
      <div className="w-full border-t border-gray-800 mb-16"></div>

      <div className="w-full px-6">
        <div className="h-15"></div>

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-500 mb-4">
            What Our Guests Say
          </h2>

          <p className="text-gray-300 text-lg">
            Experiences shared by our valued guests.
          </p>
        </div>
        <div className="h-8"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#111] border border-gray-800 p-8 rounded-3xl hover:border-yellow-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-yellow-500 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{item.review}"
              </p>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                />

                <div>
                  <h3 className="font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Verified Guest
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}