import { useState } from "react";
import React from "react";

const NavBar =() => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className = "flex items-center justify-between">
        <div>
        </div>
          <a href="#home" className="hover:text-green-300">Etusivu</a>
          <a href="#about" className="hover:text-green-300">Tietoa Ruutikankaasta</a>
          <a href="#news" className="hover:text-green-300">Ajankohtaista</a>
          <a href="#contact" className="hover:text-green-300">Yhteystiedot</a>
        </nav>
  {/* Desktop Menu */}
  <nav className="hidden md:flex space-x-8 text-white">
    <a href="#home" className="hover:text-gray-300">Etusivu</a>
    <a href="#about" className="hover:text-gray-300">Tietoa Ruutikankaasta</a>
    <a href="#news" className="hover:text-gray-300">Ajankohtaista</a>
    <a href="#contact" className="hover:text-gray-300">Yhteystiedot</a>
  </nav>
    );

} 


export default NavBar;