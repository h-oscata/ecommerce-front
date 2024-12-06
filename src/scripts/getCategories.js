import { useEffect, useState } from "react";

export const getCategories = () => {
  const URLCATEGORIES = "http://localhost:8080/api/categories";
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(URLCATEGORIES);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setLoadingCategories(false);
        setCategories(data);
        setErrorCategories(null);
      } catch (error) {
        setErrorCategories(`${error} Could not Fetch Data`);
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, [URLCATEGORIES]);

  return { categories, loadingCategories, errorCategories };
};
