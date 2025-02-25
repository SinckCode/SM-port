import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/components/preloader.scss";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.img
        src="/images/logo.png"
        alt="Succeding Media Logo"
        className="preloader-logo"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Preloader;
