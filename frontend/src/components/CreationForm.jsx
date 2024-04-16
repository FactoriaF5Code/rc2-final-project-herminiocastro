import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/CreationForm.css";

export const CreationForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const options = [
    { value: "POPS", label: "POPS" },
    { value: "VARIOS", label: "VARIOS" },
  ];
  const [categoryValue, setCategoryValue] = useState("POPS");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      image,
      categoryValue,
      title,
      description,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/articulos/", formData);
      if (response.status === 200) {
        alert("¡Publicación creada con éxito!");
        navigate("/Principal/");
      } else {
        alert("Error al crear la publicación. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear la publicación. Comprueba la consola para más información.");
    }
  };

  const handleSelectedChange = async (event) => {
    event.preventDefault();
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
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
      <button type="submit">Guardar</button>
    </form>
  );
};
