import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/projects.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // 📌 Obtener proyectos desde el backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://backend-succedingmedia01.onrender.com/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("❌ Error al obtener proyectos:", error);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2>Nuestros Proyectos</h2>

        {/* Tarjetas de proyectos */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button onClick={() => setSelectedProject(project)}>Ver Proyecto</button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Proyecto */}
        {selectedProject && (
  <div className="modal open">
    <div className="modal-content">
      <button className="close-btn" onClick={() => setSelectedProject(null)}>✖</button>
      {selectedProject.image && <img src={selectedProject.image} alt={selectedProject.title} />}
      <h3>{selectedProject.title}</h3>
      <p>{selectedProject.details || "Sin detalles disponibles"}</p>
      <div className="technologies">
        {selectedProject.technologies.length > 0
          ? selectedProject.technologies.map((tech, index) => <span key={index}>{tech}</span>)
          : "No hay tecnologías registradas"}
      </div>
      <div className="buttons">
        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="visit">Ver Proyecto</a>
        <button className="close" onClick={() => setSelectedProject(null)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default Projects;
