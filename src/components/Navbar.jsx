import React from "react";
import "../styles/components/navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Succeding Media</h1>
        <ul>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#about">Quiénes Somos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
