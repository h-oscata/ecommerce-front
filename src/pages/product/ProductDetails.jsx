import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ImgStyle.css";

export const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [mainImage, setMainImage] = useState(product?.images[0].imageUrl);

  useEffect(() => {
    setMainImage(product.images[0].imageUrl);
  }, [product]);

  const handleImageClick = (imageSrc) => setMainImage(imageSrc);

  // Check the product to render
  if (!product) {
    return (
      <div className="text-center my-5 d-flex flex-column gap-4">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, no hemos podido encontrar el producto que buscas.</p>
        <Link to="/">Volver a la página principal</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-5 my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/" + product.category.name}>
                {product.category.name}
              </Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="container d-flex flex-row mb-5">
        <div className="col-7 d-flex flex-row px-4">
          <div className="product-image d-flex align-items-center">
            <img
              className="img-fluid main-image"
              src={mainImage}
              alt="main image"
            />
          </div>
          <div className="product-small d-flex order-md-first flex-md-column justify-content-center">
            {product.images.map((image) => (
              <img
                className="touchme img-fluid border border-dark-subtle rounded-4"
                src={`${image.imageUrl}`}
                alt="product image"
                key={image.id}
                onClick={() => handleImageClick(image.imageUrl)}
              />
            ))}
          </div>
        </div>

        <div className="border rounded col-5">
          <div className="p-3 shadow-lg bg-white rounded text-start">
            <div>
              {/* <h6 className="mb-3 text-secondary">Fecha de publicacion:</h6> */}
              <h3 className="my-1 card border border-light-subtle fw-bold rounded p-3 shadow bg-warning">
                {product.name}
              </h3>
              <h5 className="my-4 text-secondary">
                Precio S/. {product.price}
              </h5>
              <Link to="/UserImbox" className="d-flex flex-column">
                <div className="btn text-light py-2 btn-details mx-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-chat-dots mx-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                  </svg>
                  Iniciar Chat
                </div>
              </Link>
              <div className="text-start">
                <h4 className="mt-5 mb-3">Detalles</h4>
                <div
                  className="accordion accordion-border-color-black"
                  id="accordionExample"
                >
                  <div className="accordion-item ">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-secondary-subtle"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Descripción
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {product.description}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed bg-secondary-subtle"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Categoria
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {product.category.name}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed bg-secondary-subtle"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Estado
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">Producto Nuevo</div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">Informacion del vendedor </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
