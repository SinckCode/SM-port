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
    images: [],
    showButton: true,
  });
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

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

  // 📌 Manejar cambios en el input de imágenes
  const handleImageChange = (e) => {
    setNewProject({ ...newProject, images: e.target.value.split(",").map(img => img.trim()) });
  };

  // 📌 Manejar cambios en el toggle de "Ver Proyecto"
  const handleSwitchChange = () => {
    setNewProject((prev) => ({ ...prev, showButton: !prev.showButton }));
  };

  // 📌 Llenar el formulario al editar un proyecto
  const editProject = (project) => {
    setNewProject({
      title: project.title || "",
      description: project.description || "",
      details: project.details || "",
      link: project.link || "",
      showButton: project.showButton ?? true,

      // 📌 Asegurar que `images` es un array válido
      images: Array.isArray(project.images) ? project.images : [project.images].filter(Boolean),

      // 📌 Asegurar que `technologies` es un array válido
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "",
    });

    setEditingProject(project);
  };

  // 📌 Crear o actualizar un proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Verificar que los campos esenciales no estén vacíos
    if (!newProject.title || !newProject.description || !newProject.link || !newProject.details) {
      setError("⚠️ Todos los campos son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("⚠️ No tienes permiso para esta acción.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };

      // ✅ Asegurar que `images` y `technologies` sean arrays válidos
      const formattedProject = {
        title: newProject.title.trim(),
        description: newProject.description.trim(),
        details: newProject.details.trim(),
        link: newProject.link.trim(),
        showButton: Boolean(newProject.showButton),
        images: Array.isArray(newProject.images)
          ? newProject.images.filter(img => img.trim().length > 0)
          : (typeof newProject.images === "string" ? newProject.images.split(",").map(img => img.trim()).filter(img => img.length > 0) : []),
        technologies: Array.isArray(newProject.technologies)
          ? newProject.technologies.filter(tech => tech.trim().length > 0)
          : (typeof newProject.technologies === "string" ? newProject.technologies.split(",").map(tech => tech.trim()).filter(tech => tech.length > 0) : []),
      };

      // ✅ Validar que haya al menos una imagen
      if (formattedProject.images.length === 0) {
        setError("⚠️ Debes agregar al menos una imagen.");
        return;
      }

      // ✅ Validar que haya al menos una tecnología
      if (formattedProject.technologies.length === 0) {
        setError("⚠️ Debes agregar al menos una tecnología.");
        return;
      }

      console.log("📌 Enviando datos a /projects:", formattedProject);

      if (editingProject) {
        await axios.put(`https://backend-succedingmedia01.onrender.com/projects/${editingProject._id}`, formattedProject, config);
        setSuccess("✅ Proyecto actualizado correctamente.");
      } else {
        await axios.post("https://backend-succedingmedia01.onrender.com/projects", formattedProject, config);
        setSuccess("✅ Proyecto creado correctamente.");
      }

      // ✅ Restablecer formulario
      setNewProject({ title: "", description: "", details: "", technologies: "", link: "", images: [], showButton: true });
      setEditingProject(null);
      fetchProjects();
      setError("");
    } catch (err) {
      console.error("❌ Error al guardar el proyecto:", err.response?.data || err);
      setError(err.response?.data?.error || "Error al guardar el proyecto.");
    }
  };

  // 📌 Eliminar proyecto
  const deleteProject = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("⚠️ No tienes permiso para esta acción.");
        return;
      }

      await axios.delete(`https://backend-succedingmedia01.onrender.com/projects/${id}`, {
        headers: { Authorization: token },
      });

      fetchProjects();
    } catch (err) {
      setError("Error al eliminar proyecto.");
    }
  };

  return (
    <div className="admin-projects">
      <h2>📂 Gestión de Proyectos</h2>

      <div className="form-container">
        <h3>{editingProject ? "✏️ Editar Proyecto" : "➕ Agregar Nuevo Proyecto"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Título" value={newProject.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Descripción breve" value={newProject.description} onChange={handleChange} required />
          <textarea name="details" placeholder="Detalles completos" value={newProject.details} onChange={handleChange} />
          <input type="text" name="technologies" placeholder="Tecnologías (separadas por coma)" value={newProject.technologies} onChange={handleChange} />
          <input type="text" name="link" placeholder="Enlace del proyecto" value={newProject.link} onChange={handleChange} />
          <input type="text" name="images" placeholder="URLs de imágenes (separadas por coma)" value={newProject.images.join(",")} onChange={handleImageChange} />
          <label>
            Mostrar botón "Ver Proyecto":
            <input type="checkbox" checked={newProject.showButton} onChange={handleSwitchChange} />
          </label>
          <button type="submit">{editingProject ? "Actualizar Proyecto" : "Crear Proyecto"}</button>
        </form>
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

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
