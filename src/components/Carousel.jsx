import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/components/Carousel.scss";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 3; // Cantidad de imágenes visibles a la vez

  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Avanza cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]); // Se reinicia el intervalo cuando cambian las imágenes

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://backend-succedingmedia01.onrender.com/carousel");
      setImages(response.data);
    } catch (err) {
      console.error("Error al obtener imágenes.");
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - visibleImages + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length - visibleImages + 1)) % (images.length - visibleImages + 1));
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
            transition: "transform 0.5s ease-in-out"
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="carousel-slide"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {img.link ? (
                <a href={img.link} target="_blank" rel="noopener noreferrer">
                  <img src={img.imageUrl} alt={img.title || "Imagen"} />
                </a>
              ) : (
                <img src={img.imageUrl} alt={img.title || "Imagen"} />
              )}
              {img.title && <p className="carousel-title">{img.title}</p>}
            </motion.div>
          ))}
        </div>
      </div>
      <button className="carousel-btn next" onClick={nextSlide}>❯</button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {images.length > visibleImages &&
          [...Array(images.length - visibleImages + 1)].map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
