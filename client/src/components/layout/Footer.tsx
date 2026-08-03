import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-yellow-500/20 bg-gradient-to-b from-[#111] to-black text-white">
      <div className="section-container landing-footer">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-yellow-500">
              Grand Royal
            </h2>

            <p className="leading-relaxed text-gray-400">
              Experience luxury dining, premium hospitality, and unforgettable
              moments in an elegant atmosphere.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xl font-bold text-yellow-500">Explore</h3>

              <ul className="space-y-3 text-gray-400">
                <li>Fine Dining</li>
                <li>Private Events</li>
                <li>VIP Dining</li>
                <li>Gallery</li>
                <li>Reservations</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold text-yellow-500">
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

          <div>
            <h3 className="mb-6 text-xl font-bold text-yellow-500">
              Sign Up For Exclusive Offers
            </h3>
            <p className="mb-6 text-gray-400">
              Receive exclusive dining offers, seasonal menus, and VIP event
              invitations.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full rounded-xl border border-gray-700 bg-black p-4"
              />

              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="w-full rounded-xl border border-gray-700 bg-black p-4"
              />

              <button
                type="button"
                className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black transition hover:bg-yellow-400"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-yellow-500">
                Get In Touch
              </h3>

              <p className="text-gray-400">📍 Colombo, Sri Lanka</p>
              <p className="mt-2 text-gray-400">📞 +94 77 123 4567</p>
              <p className="mt-2 text-gray-400">✉ info@grandroyal.com</p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-yellow-500">
                Follow Us
              </h3>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  aria-label="Follow Grand Royal on Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black transition hover:bg-yellow-400"
                >
                  <FaInstagram aria-hidden="true" />
                </a>

                <a
                  href="https://facebook.com"
                  aria-label="Follow Grand Royal on Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black transition hover:bg-yellow-400"
                >
                  <FaFacebookF aria-hidden="true" />
                </a>

                <a
                  href="https://youtube.com"
                  aria-label="Follow Grand Royal on YouTube"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black transition hover:bg-yellow-400"
                >
                  <FaYoutube aria-hidden="true" />
                </a>
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
