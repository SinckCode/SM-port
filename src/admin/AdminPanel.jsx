import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Messages from "./Messages";
import Settings from "./Settings";
import Proyects from "./AdminProjects";
import Loader from "../components/Loader";
import "../styles/admin/admin-panel.scss";
import AdminCarousel from "./AdminCarousel";

const AdminPanel = () => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      setAuthToken(token);
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/proyects" element={<Proyects />} />
          <Route path="/carousel" element={<AdminCarousel />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
