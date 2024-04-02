import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import Boton1 from "../assets/boton1.svg";
import Boton2 from "../assets/boton2.svg";
import HomeImg from '../assets/HomeImg.png';

export const Secundary = ({ index }) => {
  const [data, setData] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../data/articles2.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const articles = await response.json();
        setData(articles[index]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [index]);

  const handlePrevImage = () => {
    setCurrentImage(prev => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage(prev => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  if (!data) {
    return <p>No hay datos disponibles para este producto.</p>;
  }

  const { images, title, description } = data;

  return (
    <div className="secundary">
      <header>
        <img src={Logo} alt="Logo" className="logo" />
      </header>
      <section className="product-details">
        <div className="images-container">
          <button className="prev-image" onClick={handlePrevImage}>
            <i className="arrow-left"></i>
          </button>
          <img src={images[currentImage]} alt="Producto" className="product-image" />
          <button className="next-image" onClick={handleNextImage}>
            <i className="arrow-right"></i>
          </button>
        </div>
        <div className="buttons">
          <Link to="/editar" className="edit-button">Editar</Link>
          <Link to="/" className="delete-button">Eliminar</Link>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <footer>
        <Link to="/"><img src={Boton1} alt="Search" /></Link>
        <Link to="/"><img src={HomeImg} alt="HomeImg" /></Link>
        <Link to="/"><img src={Boton2} alt="Profile" /></Link>
      </footer>
    </div>
  );
};





