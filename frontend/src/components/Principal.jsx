import React, { useState, useEffect } from "react";
import "./Principal.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import BotonAñadir from "../assets/walkie.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Principal = () => {
  const navigate = useNavigate();
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaActual, setCategoriaActual] = useState("Pops");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/articulos/"
        );

        console.log(response.data);
        setElementos(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const manejarScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !cargando) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const navegarFormulario = () => {
    navigate("./creationform");
  };

  const filtrarElementosPorCategoria = (categoria) => {
    return elementos.filter(
      (elemento) =>
        elemento.categoria &&
        elemento.categoria.toLowerCase() === categoria.toLowerCase()
    );
  };

  return (
    <div className="Principal">
      <header>
        <img src={Logo} alt="Logo" className="Logo" />
        <input
          className="buscador"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="elementos" onScroll={manejarScroll}>
        {filtrarElementosPorCategoria(categoriaActual)
          .filter(
            (elemento) =>
              (elemento.titulo &&
                elemento.titulo
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (elemento.categoria &&
                elemento.categoria
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          )
          .map((elemento) => (
            <React.Fragment key={elemento.id}>
              <Link to={`/secundary/${elemento.id}`} key={elemento.id}>
                <div className="elemento">
                  {elemento.imagen && (
                    <img className="elementoImg" src={elemento.imagen} />
                  )}
                  <div className="categoria">
                    <p>{elemento.categoria}</p>
                  </div>
                  <h2 className="titulo">
                    {elemento.titulo || "Título no disponible"}
                  </h2>
                </div>
              </Link>
            </React.Fragment>
          ))}
      </div>
      <footer>
        <button
          className="botonFunko"
          onClick={() => setCategoriaActual("POPS")}
        >
          <img src={Boton1} alt="Botón1" title="POPS" />
        </button>
        <button className="botonAñadir" onClick={() => navegarFormulario()}>
          <img src={BotonAñadir} alt="BotónAñadir" title="ADD" />
        </button>
        <button
          className="botonEggo"
          onClick={() => setCategoriaActual("VARIOS")}
        >
          <img src={Boton2} alt="Botón2" title="VARIOS" />
        </button>
      </footer>
    </div>
  );
};
