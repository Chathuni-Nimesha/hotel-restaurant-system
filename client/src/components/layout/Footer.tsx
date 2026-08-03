import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTripadvisor,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#111] to-blacktext-white border-t border-yellow-500/20">

      <div className="section-container landing-footer">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Left */}
          <div>

            <h2 className="text-4xl font-bold text-yellow-500 mb-6">
              Grand Royal
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Experience luxury dining, premium hospitality,
              and unforgettable moments in an elegant atmosphere.
            </p>

          </div>

          {/* Center */}
          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <h3 className="text-xl font-bold mb-6 text-yellow-500">
                Explore
              </h3>

              <ul className="space-y-3 text-gray-400">
                <li>Fine Dining</li>
                <li>Private Events</li>
                <li>VIP Dining</li>
                <li>Gallery</li>
                <li>Reservations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-yellow-500">
                Information
              </h3>

              <ul className="space-y-3 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

          </div>

          {/* Right */}
          <div>

            <h3 className="text-xl font-bold mb-6 text-yellow-500">
              Sign Up For Exclusive Offers
              <p className="text-gray-400 mb-6">
              Receive exclusive dining offers, seasonal menus,
              and VIP event invitations.
</p>
            </h3>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="
                w-full
                bg-black
                border
                border-gray-700
                rounded-xl
                p-4
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                w-full
                bg-black
                border
                border-gray-700
                rounded-xl
                p-4
                "
              />

              <button
                className="
                w-full
                bg-yellow-500
                text-black
                font-bold
                py-4
                rounded-xl
                hover:bg-yellow-400
                transition
                "
              >
                Subscribe
              </button>

            </div>

          </div>

        </div>

        {/* Contact */}
        <div className="mt-10 border-t border-gray-800 pt-8">

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">
                Get In Touch
              </h3>

              <p className="text-gray-400">
                📍 Colombo, Sri Lanka
              </p>

              <p className="text-gray-400 mt-2">
                📞 +94 77 123 4567
              </p>

              <p className="text-gray-400 mt-2">
                ✉ info@grandroyal.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">
                Follow Us
              </h3>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
                  <FaInstagram />
                </div>

                <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
                  <FaFacebookF />
                </div>

                <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
                  <FaYoutube />
                </div>

              </div>
      
            </div>

          </div>

        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500">
          © 2026 Grand Royal. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;