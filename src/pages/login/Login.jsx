import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Correo o contraseña incorrectos.");
        }
        throw new Error("Error en el servidor. Inténtalo más tarde.");
      }

      const data = await response.json();

      const {
        name,
        lastname,
        email: userEmail,
        phone,
        profile_picture,
        address,
      } = data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name,
          lastname,
          email: userEmail,
          phone,
          profile_picture,
          address,
        })
      );

      navigate("/");
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className=" bg-danger vh-100 d-flex align-items-center"
      style={{
        backgroundImage:
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-q86m6WZ6lNwPppIZt7-rWxs-1bKfBaXt-lshRcl4WiiP8xwRNqXic-hS6gKigqtzYs&usqp=CAU")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container py-5 rounded-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Fondo blanco con opacidad del 50%
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="110"
          height="110"
          fill="currentColor"
          className="bi bi-shop-window mb-4"
          viewBox="0 0 16 16"
        >
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
        </svg>
        <h2 className="text-center mb-4">Bienvenidos a U-Market</h2>

        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control mb-2"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="w-50 m-auto ">
            <button type="submit" className="btn btn-primary w-100 mb-2 py-2">
              Iniciar Sesión
            </button>
          </div>
          <div className="w-50 m-auto ">
            <Link
              to="/Register"
              className="btn bg-footer-custom pt-2 btn-primary w-100"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
