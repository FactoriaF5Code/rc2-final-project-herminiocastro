import { useState, useEffect } from "react";
import "./Principal.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import datos from "../data/articles.json";

export const Principal = () => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);

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
        <img className="LogoPrincipal" src={Logo} alt="Logo" />
      </header>
      <div className="buscador">
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="elementos" onScroll={manejarScroll}>
        {elementos.map((elemento, index) => (
          <div className="elemento" key={index}>
            {elemento.imagen && (
              <img src={elemento.imagen} alt={elemento.titulo} /> 
            )}
            <h2>{elemento.titulo}</h2>
            <p>{elemento.descripcion}</p>
          </div>
        ))}
        {cargando && <div className="cargando">Cargando...</div>}
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



