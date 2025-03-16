import React from "react";
import "../styles/components/about.scss";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2>Quiénes Somos</h2>
        <div className="about-content">
          <p>
            En Succeding Media, somos un equipo apasionado por la tecnología y el diseño digital.
            Nos especializamos en el desarrollo web y la creación de experiencias innovadoras
            para ayudar a nuestros clientes a crecer en el mundo digital.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <h3>10+</h3>
            <p>Proyectos Realizados</p>
          </div>
          <div className="stat">
            <h3>5+</h3>
            <p>Años de Experiencia</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Clientes Satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
