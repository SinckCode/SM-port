import React from "react";
import "../styles/components/loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default Loader;
