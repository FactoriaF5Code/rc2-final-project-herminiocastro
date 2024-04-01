import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home.jsx";
import { Principal } from "../components/Principal.jsx";
// import { Secundary } from "../components/Secundary.jsx";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal/*" element={<Principal />} />
        {/* <Route path="/secundary/*" element={<Secundary />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
