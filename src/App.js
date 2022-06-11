import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Perfil from "./pages/perfil";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/perfil" element={<Perfil />}></Route>
    </Routes>
  );
}

export default App;
