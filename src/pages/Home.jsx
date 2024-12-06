import { Link } from "react-router-dom";
import { useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { getProducts } from "../scripts/getProducts";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Home = ({ categories }) => {
  const { products, loadingProducts, errorProducts } = getProducts();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <div className="text-center container py-5">
        <h3 className="mt-4 mb-5">
          <strong>PRODUCTOS</strong>
        </h3>
        <div className="row">
          {loadingProducts && <LoadingSpinner />}
          {errorProducts && <div>{errorProducts}</div>}
          {products &&
            visibleProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
        {visibleCount < products.length && (
          <button
            onClick={handleLoadMore}
            className="btn btn-primary btn-sm px-5 mt-3"
          >
            Cargar Mas ...
          </button>
        )}
      </div>
      <div className="bg-custom p-5 d-flex align-items-center">
        <div className="px-3">
          <img
            src="https://dialogmarket.com/media/images/service-live-chat.png"
            alt="chatting and sell"
          />
        </div>
        <div className="container d-flex flex-column align-items-center">
          <h4>
            <strong className="lh-base">
              CONÉCTATE CON DISTINTAS PERSONAS DESCUBRE UNA NUEVA FORMA DE
              COMERCIO CON NUESTRA PLATAFORMA
            </strong>
          </h4>
          <ul className="lh-lg fw-light my-4" style={{ listStyleType: "none" }}>
            <li>✔ Conectate fácilmente con vendedores y compradores.</li>
            <li>✔ Explora una amplia variedad de productos.</li>
            <li>✔ Vende tus productos de forma rápida y sencilla</li>
            <li>
              ✔ Disfruta de un espacio seguro y amigable para tus intercambios.
            </li>
          </ul>
          <div className="d-grid col-6 mx-auto my-3">
            <p>¡Empieza hoy y disfruta vender y comprar!</p>
            <Link
              to={"/UserImbox"}
              className="btn btn-warning py-3"
              type="button"
            >
              <strong> Ir a mi IMBOX</strong>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5 border-top">
        <h3>
          <strong>Categorias</strong>
        </h3>
        <div
          className="row m-4 pt-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "30px",
          }}
        >
          {categories.map((category) => (
            <Link
              to={`/${category.name}`}
              key={category.id}
              className="card text-center border-0 shadow rounded-0 p-4 card-custom"
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-bookmark mb-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              <div className="card-body my-4">
                <h4 className="card-title fw-bold my-4">{category.name}</h4>
                <p className="card-text mt-4">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
