import { useState, useEffect } from 'react';
import './Home.css';
import Gift from '../assets/GiftVecna.svg'
import Logo from '../assets/STRANGER-POPS-WORLD-23-3-2024.png'

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
      <img src={Gift} alt="logo" className="gift" />
      <img src={Logo} alt="logo" className="logo" />
      </div>
    </div>
  );
};

