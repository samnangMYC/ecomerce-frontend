import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [underlineStyles, setUnderlineStyles] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeLink = container.querySelector(
      `a[href="${location.pathname}"]`
    );
    if (activeLink) {
      setUnderlineStyles({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    } else {
      setUnderlineStyles({ left: 0, width: 0 });
    }
  }, [location, isMenuOpen]);

  return (
    <nav className="bg-indigo-800 text-white h-20 flex items-center justify-between px-6 relative z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        ShopEase
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Nav */}
      <ul
        ref={containerRef}
        className="hidden md:flex items-center space-x-10 relative cursor-pointer select-none"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative py-2 transition-colors duration-300 ${
                  isActive
                    ? "text-orange-300 font-semibold"
                    : "text-white hover:text-orange-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}

        {/* Underline */}
        <span
          className="absolute bottom-0 h-[2px] bg-orange-300 transition-all duration-300 ease-in-out"
          style={{
            width: underlineStyles.width,
            left: underlineStyles.left,
          }}
        />

        <Link
          to="/cart"
          className="relative text-white hover:text-orange-300 transition-colors duration-300"
        >
          <FaShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Link>

        <Link
          to="/signin"
          className="text-white hover:text-orange-300 transition-colors duration-300"
        >
          Sign In
        </Link>
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-indigo-700 flex flex-col items-start px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg w-full ${
                location.pathname === link.path
                  ? "text-orange-300 font-semibold"
                  : "text-white hover:text-orange-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/cart"
            className="relative text-white hover:text-orange-300 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart className="w-6 h-6 inline mr-2" />
            Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>

          <Link
            to="/signin"
            className="text-white hover:text-orange-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
