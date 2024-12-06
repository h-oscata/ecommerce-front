import { useEffect, useState } from "react";

export const getProducts = () => {
  const URLPRODUCTS = "http://localhost:8080/api/products";
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(URLPRODUCTS);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setLoadingProducts(false);
        setProducts(data);
        setErrorProducts(null);
      } catch (error) {
        setErrorProducts(`${error} Could not Fetch Data`);
        setLoadingProducts(false);
      }
    };
    fetchData();
  }, [URLPRODUCTS]);

  return { products, loadingProducts, errorProducts };
};
