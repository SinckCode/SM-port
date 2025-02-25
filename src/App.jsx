import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./admin/Login";
import AdminPanel from "./admin/AdminPanel";
import "./styles/global.scss";

function App() {
  return (
    <Routes>
      {/* Rutas del frontend */}
      <Route path="/" element={<><Navbar /><Hero /><Projects /><About /><Contact /></>} />

      {/* Ruta de Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta del Panel de Administración */}
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
