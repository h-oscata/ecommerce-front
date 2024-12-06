import React, { useState, useEffect } from "react";

export const ProductFormModal = ({ closeModal, product }) => {
  const [formProduct, setFormProduct] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    price: "",
    imageUrls: [""], 
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = !!product;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/categories");
        if (!response.ok) throw new Error("Error al cargar categorías");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("No se pudieron cargar las categorías");
      }
    };
    fetchCategories();


    if (isEditing) {
      setFormProduct({
        id: product.id,
        title: product.name || "",
        description: product.description || "",
        category: product.category?.id || "",
        price: product.price || "",
        imageUrls: product.images?.map((img) => img.imageUrl) || [""], // Garantizamos que sea un array
      });
    } else {
    
      setFormProduct({
        id: null,
        title: "",
        description: "",
        category: "",
        price: "",
        imageUrls: [""],
      });
    }
  }, [product, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index, value) => {
    const updatedImageUrls = [...formProduct.imageUrls];
    updatedImageUrls[index] = value;
    setFormProduct((prev) => ({ ...prev, imageUrls: updatedImageUrls }));
  };

  const addImageUrlField = () => {
    setFormProduct((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const removeImageUrlField = (index) => {
    const updatedImageUrls = formProduct.imageUrls.filter((_, i) => i !== index);
    setFormProduct((prev) => ({ ...prev, imageUrls: updatedImageUrls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const productData = {
        name: formProduct.title,
        description: formProduct.description,
        category: { id: parseInt(formProduct.category, 10) },
        price: parseFloat(formProduct.price),
        images: formProduct.imageUrls
          .filter((url) => url.trim() !== "") // Filtra URLs vacías
          .map((url) => ({ imageUrl: url })), // Agrega las imágenes al producto
      };
  
      const productResponse = await fetch(
        isEditing
          ? `http://localhost:8081/api/products/${formProduct.id}`
          : "http://localhost:8081/api/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
  
      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        throw new Error(errorData.message || "Error al registrar el producto");
      }
  
      closeModal(); // Cierra el modal
    } catch (err) {
      setError(err.message || "Hubo un problema al enviar los datos");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content bg-body-secondary">
          <div className="modal-header px-4 text-bg-dark">
            <h5 className="modal-title">
              {isEditing ? "EDITAR PRODUCTO" : "PUBLICA UN NUEVO PRODUCTO"}
            </h5>
            <button
              type="button"
              className="btn-close bg-white"
              onClick={closeModal}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <p className="text-danger">{error}</p>}
              <div className="row d-flex justify-content-center align-items-center">
                <div className="card-body px-4 text-black">
                  <div className="mb-4">
                    <h6 className="text-start">TITULO:</h6>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formProduct.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="text-start">DESCRIPCION:</h6>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formProduct.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <h6 className="text-start">CATEGORIA:</h6>
                      <select
                        className="form-select"
                        name="category"
                        value={formProduct.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccione...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <h6 className="text-start">PRECIO:</h6>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 className="text-start">URLS DE IMAGENES:</h6>
                    {Array.isArray(formProduct.imageUrls) &&
                      formProduct.imageUrls.map((url, index) => (
                        <div key={index} className="mb-2 d-flex">
                          <input
                            type="text"
                            className="form-control me-2"
                            value={url}
                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeImageUrlField(index)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={addImageUrlField}
                    >
                      + Agregar URL
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={closeModal}>
                Cerrar
              </button>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
