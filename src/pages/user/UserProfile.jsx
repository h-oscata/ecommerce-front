import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../scripts/getUserData";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Controla la edición
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
      setFormData(userData); // Inicializa el formulario con los datos actuales
    }
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar los datos actualizados al backend
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/users/${user.email}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil.");
      }

      const updatedData = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedData)); // Actualiza localStorage
      setUser(updatedData); // Actualiza el estado del usuario
      setIsEditing(false); // Sale del modo de edición
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Eliminar el perfil del usuario
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/users/${user.email}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el perfil.");
      }

      // Eliminar el usuario del localStorage y redirigir a login
      localStorage.removeItem("user");
      navigate("/Login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <main className="container my-4 px-5">
      <div className="row px-5">
        <div className="col-md-12 px-5">
          <div className="card shadow-sm mb-4 mx-3">
            <h4 className="card border border-light-subtle fw-bold rounded p-3 shadow bg-warning">
              Perfil de Usuario
            </h4>
            <div className="card-body text-center">
              <img
                src={user.profile_picture || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="rounded-circle mb-3"
                style={{ width: "150px" }}
              />
              {isEditing ? (
                <>
                  {/* Campos de edición */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Apellido"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Celular"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Dirección"
                  />
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleUpdate}
                  >
                    Guardar Cambios
                  </button>
                  <button
                    className="btn btn-secondary mt-2 ms-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* Vista normal del perfil */}
                  <h5 className="card-title my-4">
                    {user.name} {user.lastname}
                  </h5>
                  <p className="card-text my-4">
                    <strong>Correo: </strong> {user.email}
                  </p>
                  <p className="card-text my-4">
                    <strong>Celular: </strong> {user.phone}
                  </p>
                  <p className="card-text my-4">
                    <strong>Dirección: </strong> {user.address}
                  </p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                      >
                      Editar Perfil
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Eliminar Perfil
                    </button>
                    <Link
                      to="/Login"
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
