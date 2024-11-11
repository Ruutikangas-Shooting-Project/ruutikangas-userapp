import React, { useState } from 'react';
import headerImage from '../images/header-bg-800x350.jpg';
import { useTranslation } from 'react-i18next';

const Header = () => {
  // State for toggling the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // Translation hook for managing language translations
  const { t, i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header
      // Setting background image and styling for the header
      style={{ backgroundImage: `url(${headerImage})` }}
      className="bg-cover bg-center bg-white text-white p-6 h-[280px] md:h-[380px] relative"
    >
      <div className="container mx-auto flex flex-col justify-between items-center px-6">
        {/* Logo and Title Section */}
        <div className="flex items-center">
          {/* Logo Image */}
          <img src="/images/logo-light.png" alt="Shooting Center Logo" className="h-18 w-auto" />
          {/* Main Title */}
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
            {t('ruutikangas_title')}
          </h1>
        </div>

        {/* Subtitle / Description Section */}
        <p className="text-sm md:text-base mt-4">
          {t('ruutikangas_description')}
        </p>

        {/* Right Section: Language Switch, Sign In / Sign Up Links */}
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex space-x-2">
            <button onClick={() => changeLanguage('fi')} className="text-white hover:text-green-500">
              FI
            </button>
            <span className="text-white">|</span>
            <button onClick={() => changeLanguage('en')} className="text-white hover:text-green-500">
              EN
            </button>
          </div>

          {/* Sign In / Sign Up Links */}
          <a href="#signin" className="text-white hover:text-green-500">
            {t('sign_in')}
          </a>
          <a href="#signup" className="text-white hover:text-green-500 py-2 px-4 rounded">
            {t('sign_up')}
          </a>

          {/* Mobile Hamburger Icon for Menu (Visible only on small screens) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // If the mobile menu is open, show the "close" icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              // If the mobile menu is closed, show the "menu" icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Section (Visible only when "isOpen" is true) */}
      {isOpen && (
        <div className="bg-white text-black absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center md:hidden">
          {/* Menu Links for mobile view */}
          <a href="#home" className="mb-4" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" className="mb-4" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" className="mb-4" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
