import { useState, useEffect } from 'react';
import "./Secundary.css"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import HomeImg  from '../assets/HomeImg.png';

import datos from "../data/articles.json";

export const Secundary = ({ index }) => { 
  const [datosProducto, setDatosProducto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const articulos = datos;
    setDatosProducto(articulos[index]);
  }, [index]);

  const manejarImagenAnterior = () => {
    setImagenActual(prev => (prev === 0 ? datosProducto.imagenes.length - 1 : prev - 1));
  };

  const manejarSiguienteImagen = () => {
    setImagenActual(prev => (prev === datosProducto.imagenes.length - 1 ? 0 : prev + 1));
  };

  if (!datosProducto) {
    return <p>No hay datos disponibles para este producto.</p>;
  }

  const { imagen, titulo, descripcion } = datosProducto;

  return (
    <div className="secundario">
      <header>
        <img src={Logo} alt="Logo" className="logo" />
      </header>
      <section className="detalles-producto">
        <div className="contenedor-imagenes">
          <button className="imagen-anterior" onClick={manejarImagenAnterior}>
            <i className="flecha-izquierda"></i>
          </button>
          <img src={imagen[imagenActual]} alt="Producto" className="imagen-producto" />
          <button className="imagen-siguiente" onClick={manejarSiguienteImagen}>
            <i className="flecha-derecha"></i>
          </button>
        </div>
        <div className="botones">
          <Link to="/editar" className="boton-editar">Editar</Link>
          <Link to="/" className="boton-eliminar">Eliminar</Link>
        </div>
        <h1>{titulo}</h1>
        <p>{descripcion}</p>
      </section>
      <footer>
        <Link to="/"><img src={Boton1} alt="Buscar" /></Link>
        <Link to="/"><img src={HomeImg} alt="Inicio" /></Link>
        <Link to="/"><img src={Boton2} alt="Perfil" /></Link>
      </footer>
    </div>
  );
};

Secundary.propTypes = {
  index: PropTypes.number.isRequired,
};







