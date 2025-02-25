import React, { useState } from "react";
import "../styles/components/contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("https://backend-succedingmedia01.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("✅ Mensaje enviado correctamente.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setStatus("❌ Error al enviar el mensaje.");
    }
  };


  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2>Contacto</h2>
        <p>Hablemos sobre tu próximo proyecto. ¡Estamos listos para ayudarte!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-button">Enviar Mensaje</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;
