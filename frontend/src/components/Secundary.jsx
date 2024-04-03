import { useState, useEffect } from 'react';
import "./Secundary.css";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import HomeImg  from '../assets/HomeImg.png';

import datos from "../data/articles.json";

export const Secundary = ({ index }) => { 
  console.log('El indice es: ' + index);
  const [tituloProducto, setTituloProducto] = useState(0);
  const [descripcionProducto, setDescripcionProducto] = useState(0);
  const [imagenesProducto, setImagenesProducto] = useState([]);

  useEffect(() => {
    const articulos = datos;
    setTituloProducto(articulos[0].titulo);
    setDescripcionProducto(articulos[0].descripcion);
    setImagenesProducto(articulos[0].imagenes);
  }, [0]);

  if (imagenesProducto != undefined && !imagenesProducto.length) {
    return <p>No hay datos disponibles para este producto.</p>;
  }

  return (
    <div className="secundario">
      <header>
        <img src={Logo} alt="Logo" className="logo" />
      </header>
      <section className="detalles-producto">
        <div className="contenedor-imagenes">
          {imagenesProducto.map((imagen, indice) => (
            <img key={indice} src={imagen} alt="Producto" className="imagen-producto" />
          ))}
        </div>
        <div className="botones">
          <Link to="/editar" className="boton-editar">Editar</Link>
          <Link to="/" className="boton-eliminar">Eliminar</Link>
        </div>
        <h1>{tituloProducto}</h1>
        <p>{descripcionProducto}</p>
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







