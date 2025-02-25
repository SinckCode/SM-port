import React, { useState } from "react";
import "../styles/components/projects.scss";

const projects = [
  {
    id: 1,
    title: "Proyecto 1",
    description: "Desarrollo de una plataforma web con React y Node.js.",
    image: "/images/project1.jpg",
    link: "https://proyecto1.com",
    details: "Este es un proyecto avanzado que involucra la creación de una plataforma web altamente escalable.",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Proyecto 2",
    description: "Diseño UI/UX para una aplicación móvil innovadora.",
    image: "/images/project2.jpg",
    link: "https://proyecto2.com",
    details: "Este proyecto consistió en diseñar la interfaz de usuario y experiencia de usuario para una app de productividad.",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS"]
  },
  {
    id: 3,
    title: "Proyecto 3",
    description: "E-commerce optimizado para conversiones.",
    image: "/images/project3.jpg",
    link: "https://proyecto3.com",
    details: "Una plataforma de comercio electrónico diseñada para maximizar conversiones con estrategias de UX.",
    technologies: ["Shopify", "Next.js", "Stripe"]
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2>Nuestros Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button onClick={() => setSelectedProject(project)}>Ver Proyecto</button>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="modal open">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setSelectedProject(null)}>✖</button>
              <img src={selectedProject.image} alt={selectedProject.title} />
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.details}</p>
              <div className="technologies">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
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
