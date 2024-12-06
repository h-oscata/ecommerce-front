import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const payload = {
      name: formData.firstName,
      lastname: formData.lastname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      profile_picture: formData.profilePicture,
      address: formData.address,
    };

    try {
      const response = await fetch("http://localhost:8082/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/Login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar usuario.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
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
        <h2 className="text-center mb-4">
          Registrate para empezar a comprar y vender!
        </h2>

        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastname" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="profilePicture" className="form-label">
                Foto de perfil
              </label>
              <input
                type="url"
                className="form-control"
                id="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                placeholder="http://example.com/profile.jpg"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="row">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn bg-header-custom pt-2 btn-primary w-100 mb-4"
              >
                Registrarse
              </button>
            </div>
            <div className="col-md-6">
              <Link
                to="/Login"
                className="btn btn-secondary w-100 mb-4 text-light"
              >
                Volver
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
