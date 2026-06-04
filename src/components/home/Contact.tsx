const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] text-white py-24"
    >
      <div className="mt-24"></div>
      <div className="w-full border-t border-gray-800 mb-16"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="h-12 "></div>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-500 mb-4">
            Contact Us
          </h2>

          <p className="text-gray-300 text-lg">
            We'd love to hear from you. Get in touch with Grand Royal.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 justify-center items-start">
          {/* Left Side */}
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-18 max-w-xl w-full mx-auto ">
              <h3 className="text-3xl font-bold text-yellow-500 mb-8">
                Get In Touch
              </h3>

              <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white mb-2">
                  📍 Address
                </h4>

                <p className="text-gray-400">
                  123 Luxury Avenue,
                  Colombo, Sri Lanka
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">
                  📞 Phone
                </h4>

                <p className="text-gray-400">
                  +94 77 123 4567
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">
                  ✉️ Email
                </h4>

                <p className="text-gray-400">
                  info@grandroyal.com
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">
                  🕒 Opening Hours
                </h4>

                <p className="text-gray-400">
                  Monday - Sunday
                  <br />
                  10:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <form className="bg-[#111] border border-gray-800 rounded-3xl p-8 max-w-xl w-full mx-auto">
            <h3 className="text-3xl font-bold text-yellow-500 mb-8">
              Send a Message
            </h3>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-yellow-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-yellow-500"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-yellow-500"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;