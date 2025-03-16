import React from "react";
import { motion } from "framer-motion";
import "../styles/components/hero.scss";
import videoFondo from "../assets/videofondoSM.mp4";

const Hero = () => {
  return (
    <section className="hero">

      {/* 🔥 Video de fondo */}
      <div className="videoback">
        <video src={videoFondo} type="video/mp4" autoPlay loop muted></video>
      </div>

      {/* 📌 Contenedor principal con animación coordinada */}
      <motion.div
        className="container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >

        {/* 🔥 Título con animación más fluida */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Transformamos Ideas en <br /> <span>Realidad Digital</span>
        </motion.h1>

        {/* 📌 Subtítulo sincronizado con el título */}
        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Desarrollamos soluciones innovadoras que llevan tu negocio al siguiente nivel.
        </motion.p>

        {/* 🎯 Botones con animación mejor sincronizada */}
        <motion.div
          className="buttons"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="hero-button btn-paquetes"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Ver Proyectos
          </motion.button>
          <motion.button
            className="hero-button btn-hablemos"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Ver Servicios
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
