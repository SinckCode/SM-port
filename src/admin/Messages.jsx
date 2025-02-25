import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin/messages.scss";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://backend-succedingmedia01.onrender.com/messages", {
          headers: { Authorization: token },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`https://backend-succedingmedia01.onrender.com/messages/${id}`, {
          headers: { Authorization: token },
        });
        setMessages(messages.filter((msg) => msg._id !== id));
      } catch (error) {
        console.error("Error al eliminar mensaje:", error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando mensajes...</div>;
  }

  return (
    <div className="messages">
      <h1>Mensajes Recibidos</h1>
      {messages.length === 0 ? (
        <p className="no-messages">No hay mensajes aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message.length > 30 ? msg.message.substring(0, 30) + "..." : msg.message}</td>
                <td>
                  <button onClick={() => setSelectedMessage(msg)}>Ver</button>
                  <button onClick={() => handleDelete(msg._id)} className="delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedMessage && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalles del Mensaje</h2>
            <p><strong>Nombre:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Mensaje:</strong> {selectedMessage.message}</p>
            <button onClick={() => setSelectedMessage(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
