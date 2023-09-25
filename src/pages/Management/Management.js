import React, { useEffect, useState } from "react";
import axios from "axios";
import productImage from "../../Product.jpg";
import "./Management.css";

export default function Management() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formButtonName, setFormButtonName] = useState("Add Product");
  const [productToEdit, setProductToEdit] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/product");
    setProducts(result.data);
    const categoriesResult = await axios.get("http://localhost:8080/category");
    setCategories(categoriesResult.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(productToEdit === null)
      addNewProduct();
    else
      updateProduct(productToEdit);
    setName("");
    setPrice("");
    setDescription("");
    window.location.reload();
  };

  const addNewProduct = async () => {
    const newProduct = {
      name: name,
      price: price,
      description: description,
      gpsCoordinates: coordinates,
      categoryId: categoryId,
    };
    await axios.post("http://localhost:8080/product", newProduct);
  };

  const updateProduct = async (product) => {
    const newProductData = {
      name: name,
      price: price,
      description: description,
      gpsCoordinates: coordinates,
      categoryId: categoryId,
    };
    await axios.put("http://localhost:8080/product/" + product.productId, newProductData);
  };

  const editHandler = (product) => {
    setFormButtonName("Edit Product");
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCoordinates(product.gpsCoordinates);
    setCategoryId(product.category.categoryId);
    setProductToEdit(product);
  };

  const deleteHandler = async (productId) => {
    await axios.delete("http://localhost:8080/product/" + productId);
    window.location.reload();
  }
  return (
    <>
      <div className="product-management">
        <h2>Add Product</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="coordinates">Gps coordinates:</label>
          <input
            type="text"
            id="coordinates"
            name="coordinates"
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={categoryId}
            defaultValue=""
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>
              Please select a category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit">{formButtonName}</button>
        </form>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Number of Views</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>{product.views}</td>
                  <td>
                    <img src={productImage} className="product-image" />
                  </td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => editHandler(product)}
                    >
                      Edit
                    </button>
                    <button className="delete" onClick={() => deleteHandler(product.productId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
