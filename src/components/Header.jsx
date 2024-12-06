import "./Autocomplete.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../scripts/getUserData";

export const Header = ({ categories }) => {
  const [dropDown, setDropDown] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); //Instanciar useNavigate
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = getUserData();
    if (userData) setUser(userData);
  }, []);

  const changeDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleSearch = async () => {
    if (query.length > 1) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/search?name=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      }
    } else {
      setResults([]); // Limpiar resultados si la longitud es menor a 3
    }
  };

  const handleSelectResult = async (product) => {
    setQuery(product.name); // Show the product selected
    setResults([]); // Clean the result's list after select

    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();
      const productFinded = data.find((p) => p.id === product.id);
      navigate(`/ProductDetails`, { state: { product: productFinded } });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <>
      <header className="bg-header-custom text-light pt-4">
        <div className="container d-flex gap-4 align-items-center">
          <Link to={"/"} className="box text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              fill="currentColor"
              className="bi bi-shop-window"
              viewBox="0 0 16 16"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </Link>
          {/* Input de busqueda añadido */}
          <div className="search-autocomplete">
            <input
              type="text"
              placeholder="Buscar productos"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch();
              }}
              className="w-75 rounded p-2"
            />
            {results.length > 0 && (
              <ul className="list-group position-absolute mt-2 w-75">
                {results.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item"
                    onClick={() => handleSelectResult(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/UserImbox" className="text-light">
            <div className="box box-icon rounded px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-chat-dots"
                viewBox="0 0 16 16"
              >
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
              </svg>
            </div>
          </Link>

          {!user && (
            <div className="box box-icon rounded dropdown ">
              <Link
                to={"/Login"}
                className="btn  rounded px-3 py-2 text-light d-flex flex-row align-items-center"
                type="button"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <strong> Login</strong>
              </Link>
            </div>
          )}
          {user && (
            <div
              className="box box-icon rounded dropdown"
              onMouseEnter={changeDropDown}
              onMouseLeave={changeDropDown}
            >
              <button
                className="btn dropdown-toggle box box-icon rounded px-3 py-2 text-light"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <strong>{user.name.toUpperCase()}</strong>
              </button>
              <ul
                className={`dropdown-menu ${dropDown ? "show" : ""}`}
                style={{ backgroundColor: "rgba(230, 173, 29, 0.952)" }}
              >
                <li>
                  <Link to="/UserProfile" className="dropdown-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-card-list mx-1 my-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                      <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                    </svg>
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/UserPosts" className="dropdown-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-activity mx-1 my-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"
                      />
                    </svg>
                    Mis Ventas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Login"
                    className="dropdown-item fw-bold"
                    style={{ color: "rgb(179, 31, 31)" }}
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-box-arrow-right mx-1 my-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-evenly py-3">
          {categories.map((category) => (
            <Link
              to={`/${category.name}`}
              key={category.id}
              className="text-light"
            >
              <div className="box-category px-5 py-1">{category.name}</div>
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};
