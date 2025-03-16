import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin/adminProjects.scss";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    details: "",
    technologies: "",
    link: "",
    image: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  // 📌 Obtener proyectos desde el backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://backend-succedingmedia01.onrender.com/projects");
      setProjects(response.data);
      setError("");
    } catch (err) {
      setError("Error al obtener proyectos.");
    }
  };

  // 📌 Manejar cambios en los inputs
  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // 📌 Crear o actualizar un proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.link) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (editingProject) {
        // 📌 Actualizar proyecto existente
        await axios.put(`https://backend-succedingmedia01.onrender.com/projects/${editingProject._id}`, newProject);
        setSuccess("✅ Proyecto actualizado correctamente.");
      } else {
        // 📌 Crear nuevo proyecto
        await axios.post("https://backend-succedingmedia01.onrender.com/projects", newProject);
        setSuccess("✅ Proyecto creado correctamente.");
      }

      setNewProject({ title: "", description: "", details: "", technologies: "", link: "", image: "" });
      setEditingProject(null);
      fetchProjects();
      setError("");
    } catch (err) {
      setError("Error al guardar el proyecto.");
    }
  };

  // 📌 Eliminar proyecto
  const deleteProject = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;

    try {
      await axios.delete(`https://backend-succedingmedia01.onrender.com/projects/${id}`);
      fetchProjects();
    } catch (err) {
      setError("Error al eliminar proyecto.");
    }
  };

  // 📌 Cargar datos del proyecto para edición
  const editProject = (project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      details: project.details,
      technologies: project.technologies,
      link: project.link,
      image: project.image,
    });
    setEditingProject(project);
  };

  return (
    <div className="admin-projects">
      <h2>📂 Gestión de Proyectos</h2>

      {/* Formulario para agregar/editar proyecto */}
      <div className="form-container">
        <h3>{editingProject ? "✏️ Editar Proyecto" : "➕ Agregar Nuevo Proyecto"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Título" value={newProject.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Descripción breve" value={newProject.description} onChange={handleChange} required />
          <textarea name="details" placeholder="Detalles completos" value={newProject.details} onChange={handleChange} />
          <input type="text" name="technologies" placeholder="Tecnologías (separadas por coma)" value={newProject.technologies} onChange={handleChange} />
          <input type="text" name="link" placeholder="Enlace del proyecto" value={newProject.link} onChange={handleChange} required />
          <input type="text" name="image" placeholder="URL de la imagen" value={newProject.image} onChange={handleChange} />
          <button type="submit">{editingProject ? "Actualizar Proyecto" : "Crear Proyecto"}</button>
        </form>
      </div>

      {/* Mensajes de éxito/error */}
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {/* Tabla de proyectos */}
      <table className="projects-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>
                <button className="edit-btn" onClick={() => editProject(project)}>✏️ Editar</button>
                <button className="delete-btn" onClick={() => deleteProject(project._id)}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjects;
