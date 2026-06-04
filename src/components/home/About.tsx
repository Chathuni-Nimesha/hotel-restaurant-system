const About = () => {
  return (
    <section className="bg-[#0a0a0a] text-white pt-0 pb-32">

      {/* Full Width Divider */}
      <div className="w-full border-t border-gray-800"></div>

      {/* Large Luxury Space */}
      <div className="h-15"></div>

      <div className="w-full  px-6">

        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-center text-4xl md:text-6xl font-bold text-yellow-500 mb-6">
            About Grand Royal
          </h2>

          <p className="text-center text-gray-300 text-lg w-full leading-relaxed">
            Grand Royal offers an exceptional dining experience with
            premium ingredients, world-class chefs, and luxurious
            surroundings designed to create unforgettable memories.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div>
            <img
              src="/images/Interior.jpeg"
              alt="Grand Royal Restaurant"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Luxury Dining Since 2010
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6">
              We combine modern culinary techniques with timeless
              hospitality to provide guests with a truly premium
              restaurant experience.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              Whether you're celebrating a special occasion, hosting
              a business dinner, or enjoying a casual evening with
              family and friends, our team ensures every visit is
              memorable.
            </p>

            <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition duration-300">
              Learn More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;