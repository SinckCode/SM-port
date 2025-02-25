import React from "react";
import { motion } from "framer-motion";
import "../styles/components/hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Transformamos Ideas en Realidad Digital
        </motion.h1>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Desarrollamos soluciones innovadoras que llevan tu negocio al siguiente nivel.
        </motion.p>
        <motion.button
          className="hero-button"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Ver Proyectos
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
