import "./Home.css";
import Logo from "../assets/STRANGER-POPS-WORLD-23-3-2024.png";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate("./Principal");
  };

  return (
    <div className="home">
      <img
        id="stranger-things-title-image"
        src={Logo}
        alt="Stranger Pops World"
      />
      <button className="enter-button" onClick={handleEnterClick}>
        ENTER
      </button>
    </div>
  );
};
