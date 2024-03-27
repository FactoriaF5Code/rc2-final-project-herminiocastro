import { useState, useEffect } from "react";
import "./Principal.css";
import Logo from '../assets/STRANGER-POPS-WORLD-23-3-2024.png'
import Boton1 from '../assets/ImagenFunko.svg'
import Boton2 from '../assets/ImagenEggos.svg'

export const Principal = () => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerElementos = async () => {
      setCargando(true);
      const respuesta = await fetch(`API_URL?pagina=${paginaActual}`);
      const datos = await respuesta.json();
      setElementos([...elementos, ...datos.elementos]);
      setCargando(false);
    };

    obtenerElementos();
  }, [paginaActual]);

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
        <button>
          <img src={Boton1} alt="Botón1" />
        </button>
        <button>
          <img src={Boton2} alt="Botón2" />
        </button>
      </footer>
    </div>
  );
};


