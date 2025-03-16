import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin/adminCarousel.scss";

const AdminCarousel = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ imageUrl: "", title: "", link: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://backend-succedingmedia01.onrender.com/carousel");
      setImages(response.data);
      setError("");
    } catch (err) {
      setError("Error al obtener imágenes.");
    }
  };

  const handleChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newImage.imageUrl) {
      setError("La URL de la imagen es obligatoria.");
      return;
    }

    try {
      await axios.post("https://backend-succedingmedia01.onrender.com/carousel", newImage);
      setSuccess("✅ Imagen añadida correctamente.");
      setNewImage({ imageUrl: "", title: "", link: "" });
      fetchImages();
    } catch (err) {
      setError("Error al añadir la imagen.");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta imagen?")) return;

    try {
      await axios.delete(`https://backend-succedingmedia01.onrender.com/carousel/${id}`);
      fetchImages();
    } catch (err) {
      setError("Error al eliminar la imagen.");
    }
  };

  return (
    <div className="admin-carousel">
      <h2>🖼 Gestión del Carrusel</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="imageUrl" placeholder="URL de la Imagen" value={newImage.imageUrl} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Título (opcional)" value={newImage.title} onChange={handleChange} />
        <input type="text" name="link" placeholder="Enlace (opcional)" value={newImage.link} onChange={handleChange} />
        <button type="submit">Añadir Imagen</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {images.map((img) => (
          <li key={img._id}>
            <img src={img.imageUrl} alt={img.title || "Imagen"} />
            <button onClick={() => deleteImage(img._id)}>❌ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCarousel;
