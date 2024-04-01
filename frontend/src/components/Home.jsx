import './Home.css';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    
    navigate('./Principal');
  };


  return (
    <div className="home">
      <div className="logo">
      <button className="button-home" onClick={handleEnterClick}>ENTER</button>
      </div>
    </div>
  );
};
