import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import { perfilRequest } from "./../services/sessions";
import { useNavigate } from "react-router-dom";
const Perfil = () => {
  const [usuario, setUsuario] = useState("");

  const cookies = new Cookies();
  const navigate = useNavigate();
  const descifrar = (txt) => {
    var bytes = CryptoJS.AES.decrypt(txt, "jose");
    var txtDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    return txtDescifrado;
  };
  const tokenci = cookies.get("token");
  var tokenCifrado;
 

  const handleGetPerfil = async (token) => {
    if (tokenci !== undefined) {
        tokenCifrado = descifrar(tokenci);
      } else {
        navigate("/login");
        return
     }
    try {
      const response = await perfilRequest(tokenCifrado);
      setUsuario(response.data[0].usuario.name_user);
    } catch (e) {
      console.log(e);
    }
  };
  const cerrar = () => {
    cookies.remove("token", { path: "/" , sameSite: "none"});
    navigate("/");
  };
useEffect(() => {
    handleGetPerfil();
})

  return (
    <>
      <h1>Hola {usuario} </h1>
      <button onClick={cerrar}>Cerrar cesion</button>
    </>
  );
};

export default Perfil;
