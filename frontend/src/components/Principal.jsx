import React,{ useState, useEffect } from "react";
import "./Principal.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import datos from "../data/articles.json";
import { Link } from 'react-router-dom';

export const Principal = () => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando] = useState(false);

  useEffect(() => {
    setElementos(datos);
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
        <img  src={Logo} alt="Logo" className="Logo"/>
      </header>
      <div className="buscador">
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="elementos" onScroll={manejarScroll}>
        {elementos.map((elemento, index) => (
          <React.Fragment key={index}>
           <Link to={`/secundary/${index}`} key={index}>
              <div className="elemento">
                <div className="contenedor-izquierda">
                  {elemento.imagen && (
                    <img className="elementoImg" src={elemento.imagen} alt={elemento.titulo} />
                  )}
                  <div className="categoria">
                    <p>{elemento.categoria}</p>
                  </div>
                </div>
                <div className="titulo">
                  <h2>{elemento.titulo}</h2>
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




