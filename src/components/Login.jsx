import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin/login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://backend-succedingmedia01.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error al iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Usuario" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <button type="submit">Ingresar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
