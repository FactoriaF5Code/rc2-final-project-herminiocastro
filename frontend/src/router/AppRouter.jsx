import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home.jsx";
import { Principal } from "../components/Principal.jsx";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal/*" element={<Principal />} />
       
      </Routes>
    </BrowserRouter>
  );
};
