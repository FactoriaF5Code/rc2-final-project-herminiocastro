import { useState, useEffect } from 'react';
import './Home.css';
import logo from '../assets/GiftVecna.svg'

export const Home = () => {
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
      <img src={logo} alt="logo" className="logo" />
      </div>
    </div>
  );
};

