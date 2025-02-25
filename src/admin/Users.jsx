import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin/users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("❌ No hay token de autenticación.");
        return;
      }

      const response = await axios.get("https://backend-succedingmedia01.onrender.com/users", {
        headers: { Authorization: token },
      });

      setUsers(response.data);
      setError("");
    } catch (err) {
      setError("❌ Error al obtener usuarios.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`https://backend-succedingmedia01.onrender.com/users/${id}`, {
        headers: { Authorization: token },
      });

      fetchUsers(); // Recargar la lista después de eliminar
    } catch (err) {
      setError("❌ Error al eliminar usuario.");
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.username || !newUser.email || !newUser.password) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("https://backend-succedingmedia01.onrender.com/register", newUser, {
        headers: { Authorization: token },
      });

      setSuccess("✅ Usuario creado exitosamente.");
      setError("");
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      setError("❌ Error al crear usuario.");
    }
  };

  return (
    <div className="users-container">
      <h2>👥 Gestión de Usuarios</h2>

      {/* Formulario para agregar usuario */}
      <div className="add-user-form">
        <h3>➕ Agregar Nuevo Usuario</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Crear Usuario</button>
        </form>
      </div>

      {/* Mostrar mensajes de éxito o error */}
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {/* Tabla de usuarios */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">⚠️ No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
