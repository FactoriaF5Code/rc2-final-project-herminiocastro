
import { useParams } from "react-router-dom";
import "./Secundary.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import BotonVolver from "../assets/HomeImg.png";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Secundary = () => {
  const [elemento, setelemento] = useState([]);
  const { index } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/articulos/${index}`
        );
        setelemento(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [index]);

  return (
    <div className="Secundary">
      <header>
        <img src={Logo} alt="Logo" className="Logo" />
      </header>

      <div className="elemento">
        {elemento.imagen && (
          <img src={elemento.imagen} className="elementoImagen" />
        )}
      </div>
        <div className="categoriaSecond">
          <p>{elemento.categoria}</p>
        </div>

        <div className="tituloSecond">
          <h2>{elemento.titulo}</h2>
        </div>

        <div className="descripcion">
          <p>{elemento.descripcion}</p>
        </div>
      <div className="botonVolver">
        <Link to="/Principal/*">
          <img src={BotonVolver} alt="Botón Volver" />
        </Link>
      </div>
    </div>
  );
};
