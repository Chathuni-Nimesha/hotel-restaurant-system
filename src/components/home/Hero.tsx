const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 leading-tight mb-6">
          Luxury Dining Experience
        </h1>

        <p className="text-lg md:text-2xl text-white mb-8">
          Experience world-class cuisine and unforgettable moments.
        </p>

        <button className="px-10 py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 hover:scale-105 transition duration-300 shadow-lg">
          Book a Table
        </button>

      </div>
    </section>
  );
};

export default Hero;