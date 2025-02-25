import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../styles/admin/sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/admin"><FaTachometerAlt /> Dashboard</Link></li>
          <li><Link to="/admin/users"><FaUsers /> Usuarios</Link></li>
          <li><Link to="/admin/messages"><FaEnvelope /> Mensajes</Link></li>
          <li><Link to="/admin/settings"><FaCog /> Configuración</Link></li>
          <li><button onClick={handleLogout}><FaSignOutAlt /> Cerrar Sesión</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
