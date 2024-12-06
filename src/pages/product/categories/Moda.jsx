import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { CardProduct } from "../../../components/CardProduct";
import { getProducts } from "../../../scripts/getProducts";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const Moda = () => {
  const CATEGORYNAME = "Moda";
  const { products, loadingProducts, errorProducts } = getProducts();
  const filteredProducts = products.filter(
    (product) => product.category?.name === CATEGORYNAME
  );

  return (
    <>
      <div className="container-fluid">
        {loadingProducts && <LoadingSpinner />}
        {errorProducts && <div>{errorProducts}</div>}
        {products && (
          <div className="row">
            {/*Filter's options*/}
            <div className="col-lg-3">
              <h3>Filtros</h3>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Marcas y Tipos</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled">
                      {filteredProducts.map((product) => (
                        <li key={product.id}>
                          <input type="checkbox" id={`product-${product.id}`} />
                          <label htmlFor={`product-${product.id}`}>
                            {product.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Precio</Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled">
                      {/* Sort products by price before mapping */}
                      {filteredProducts
                        .slice() // We make a copy of the array to avoid mutating the original state
                        .sort((a, b) => a.price - b.price) // Sort by ascending price
                        .map((product) => (
                          <li key={product.id}>
                            <input type="checkbox" id={`price-${product.id}`} />
                            <label htmlFor={`price-${product.id}`}>
                              S/. {product.price}
                            </label>
                          </li>
                        ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="col-lg-9 mt-4">
              <div className="row">
                {filteredProducts.map((product) => (
                  <CardProduct key={product.id} product={product}></CardProduct>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
