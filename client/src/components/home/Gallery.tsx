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
    <section className="bg-[#0a0a0a] text-white py-24">
      <div className="w-full border-t border-gray-800 mb-4"></div>

      <div className="w-full  px-6">
        <div className="h-8"></div>

        <div className="text-center ">
          <h2 className="text-5xl font-bold text-yellow-500 mb-4">
            Luxury Experience
          </h2>

          <p className="text-gray-300 text-lg mb-32">
            Discover elegant spaces, premium hospitality, and unforgettable moments.
          </p>
        </div>
        <div className="h-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-3xl overflow-hidden border border-gray-800 hover:border-yello-500 hover:translate-y-2 transition-all duration-500  group  "
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}