import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-info"
        role="status"
        style={{ width: "5rem", height: "5rem", borderWidth: "0.7rem" }} // Ajusta el grosor aquí
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
      <h5 className="ms-3"> Cargando, por favor espera...</h5>
    </div>
  );
};
