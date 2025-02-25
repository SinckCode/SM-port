import React, { useState } from "react";
import axios from "axios";
import "../styles/admin/settings.scss";

const Settings = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Guardando cambios...");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("https://backend-succedingmedia01.onrender.com/settings", formData, {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        setStatus("✅ Configuración actualizada correctamente.");
      }
    } catch (error) {
      setStatus("❌ Error al actualizar configuración.");
    }
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Configuración</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Nuevo correo"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Cambios</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Settings;
