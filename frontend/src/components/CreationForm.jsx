import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../components/CreationForm.css";

export const CreationForm = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryValue, setCategoryValue] = useState("POPS");

  useEffect(() => {
    if (index) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/articulos/${index}`
          );
          const { image, categoria, titulo, descripcion } = response.data;
          setImage(image);
          setCategoryValue(categoria);
          setTitle(titulo);
          setDescription(descripcion);
        } catch (error) {
          console.error("Error al obtener datos del artículo:", error);
        }
      };
      fetchArticle();
    }
  }, [index]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const jsonData = {
      categoria: categoryValue,
      titulo: title,
      descripcion: description,
    };
    formData.append("file", image);
    formData.append("jsonData", JSON.stringify(jsonData));

    try {
      if (index) {
        await axios.put(
          `http://localhost:8080/api/articulos/${index}`,
          formData
        );
        alert("Artículo actualizado con éxito!");
      } else {
        await axios.post("http://localhost:8080/api/articulos/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Artículo creado con éxito!");
      }
      navigate("/Principal/");
    } catch (error) {
      console.error("Error al enviar el artículo:", error);
      alert("Error al enviar el artículo. Inténtalo de nuevo.");
    }
  };

  const handleSelectedChange = (event) => {
    setCategoryValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="file"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <select id="select" value={categoryValue} onChange={handleSelectedChange}>
        <option value="POPS">POPS</option>
        <option value="VARIOS">VARIOS</option>
      </select>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <button type="submit">{index ? "Actualizar" : "Guardar"}</button>
    </form>
  );
};
