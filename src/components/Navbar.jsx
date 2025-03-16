import React from "react";
import logoIMG from "../assets/LogoSM.png";
import "../styles/components/navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Succeding Media</h1>
        <img src={logoIMG} alt="" className="logos" />
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
