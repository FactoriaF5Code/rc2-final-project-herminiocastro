import './Home.css';
import Logo from '../assets/STRANGER-POPS-WORLD-23-3-2024.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => { 
    navigate('./Principal');
  };

  return (
    <div className="home">
      <div className="logo">
        <img src={Logo} alt="Stranger Pops World" /> 
        <button className="button-home" onClick={handleEnterClick}>ENTER</button>
      </div>
    </div>
  );
}; 

