import { useState, useEffect } from 'react';
import axios from 'axios';

function ArticulosList() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axios.get('/api/articulos'); // Reemplaza la URL con la ruta correcta de tu API
        setArticulos(response.json());
      } catch (error) {
        console.error('Error al obtener los artículos:', error);
      }
    };

    fetchArticulos();
  }, []);

  return articulos;

}

export default ArticulosList;
