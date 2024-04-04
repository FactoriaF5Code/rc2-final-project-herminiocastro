import React, { useState, useEffect } from "react";
import "./Principal.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export const Principal = () => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

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
        {elementos
            .filter((elemento) =>
                (elemento.titulo && elemento.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (elemento.categoria && elemento.categoria.toLowerCase().includes(searchTerm.toLowerCase())) 
            )
            .map((elemento, index) => (
              <React.Fragment key={index}>
                <Link to={`/secundary/${index}`} key={index}>
                  <div className="elemento">
                    <div className="contenedor-izquierda">
                      {elemento.imagen && (
                        <img
                          className="elementoImg"
                          src={elemento.imagen.slice(0, 1)[0]}
                          alt={elemento.titulo}
                        />
                      )}
                      <div className="categoria">
                        <p>{elemento.categoria}</p>
                      </div>
                    </div>
                    <div className="titulo">
                      <h2>{elemento.titulo?.toLowerCase() || 'Título no disponible'}</h2>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))}
      </div>
      <footer>
        <button className="botonFunko">
          <img src={Boton1} alt="Botón1" />
        </button>
        <button className="botonEggo">
          <img src={Boton2} alt="Botón2" />
        </button>
      </footer>
    </div>
  );
};

