import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
      if (seconds === 0) {
        clearInterval(interval);
        // Redirigir a la siguiente página
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Home">
      <div className="fondo-animado"></div>
      <div className="logo">
        <img src="../assets/STRANGER-POPS-WORLD-23-3-2024.png" alt="Logo de la aplicación" />
      </div>
      <div className="temporizador">
        {seconds}
      </div>
    </div>
  );
};

export default Home;
