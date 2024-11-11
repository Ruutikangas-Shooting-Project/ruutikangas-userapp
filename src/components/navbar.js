import React, { useState } from "react";

const NavBar = () => {
  // State for toggling mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-6">
      {/* Main Container */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name Section */}
        <div>
          <a href="#home" className="text-2xl font-bold">Ruutikangas</a>
        </div>

        {/* Desktop Menu - Visible on medium screens and above */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-gray-300">Etusivu</a>
          <a href="#about" className="hover:text-gray-300">Tietoa Ruutikankaasta</a>
          <a href="#news" className="hover:text-gray-300">Ajankohtaista</a>
          <a href="#contact" className="hover:text-gray-300">Yhteystiedot</a>
        </div>

        {/* Hamburger Icon for Mobile Menu - Visible only on small screens */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            // Close Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Visible only when "isOpen" is true */}
      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 flex flex-col items-start space-y-4">
          <a href="#home" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Etusivu</a>
          <a href="#about" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Tietoa Ruutikankaasta</a>
          <a href="#news" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Ajankohtaista</a>
          <a href="#contact" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Yhteystiedot</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
