import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./login.scss";
import { loginRequest } from "./../services/sessions";
import CryptoJS from "crypto-js";
import Swal from "sweetalert";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const cifrar = (text) => {
    var txtcifrado = CryptoJS.AES.encrypt(text, "jose").toString();
    return txtcifrado;
  };

  const handlePassword = () => {
    setShowPass(!showPass);
  };

  const handleLogin = async (user) => {
    const response = await loginRequest(user);
    console.log(response);
    if (response.data.mensaje === "se inicio sesion") {
      Swal({
        title: "Bienvenido",
        text: "Datos correctos",
        icon: "success",
        button: "acceptar",
        timer: "3000",
      });
      const cookies = new Cookies();
      cookies.set("token", cifrar(response.data.acess_token), 
        {
          path: "/", sameSite: "none"
        }
      );
      navigate("/perfil");
    } else {
      Swal({
        title: "Error",
        text: "Datos incorrectos",
        icon: "error",
        button: "acceptar",
        timer: "3000",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name_user: "",
          password_user: "",
        }}
        validationSchema={Yup.object({
          name_user: Yup.string().required("Esto es obligatorio"),
          password_user: Yup.string().required("Esto es obligatorio"),
        })}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        <Form>
          <Field className="input" name="name_user" type="text" />
          <ErrorMessage component={"span"} className="error" name="name_user" />
          <Field
            className="input"
            name="password_user"
            type={showPass ? "text" : "password"}
          />
          <ErrorMessage
            component={"span"}
            className="error"
            name="password_user"
          />
          <svg
            onClick={handlePassword}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </>
  );
}
