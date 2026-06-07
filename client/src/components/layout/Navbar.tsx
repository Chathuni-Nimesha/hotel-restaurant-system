const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        <h1 className="text-3xl font-bold text-yellow-500 cursor-pointer">
          Grand Royal
        </h1>

        <ul className="hidden md:flex gap-10 text-lg font-medium">
          <li className="hover:text-yellow-500 transition duration-300 cursor-pointer">
            Home
          </li>

          <li className="hover:text-yellow-500 transition duration-300 cursor-pointer">
            Menu
          </li>

          <li className="hover:text-yellow-500 transition duration-300 cursor-pointer">
            About
          </li>

          <li className="hover:text-yellow-500 transition duration-300 cursor-pointer">
            Reservations
          </li>

          <li className="hover:text-yellow-500 transition duration-300 cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;