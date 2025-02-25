import React from "react";
import "../styles/admin/dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Usuarios Registrados</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>Mensajes Recibidos</h3>
          <p>30</p>
        </div>
        <div className="stat-card">
          <h3>Proyectos Completados</h3>
          <p>15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
