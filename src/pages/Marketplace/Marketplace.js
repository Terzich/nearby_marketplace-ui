import React, { useEffect, useState } from "react";
import "./Marketplace.css";
import Card from "../../Card/Card";
import ProductList from "./ProductList";
import axios from "axios";

export default function Marketplace(props) {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/product");
    setProducts(result.data);
  };

  // const handleInputChange = debounce(async (event) => {
  //   const result = await axios.get(
  //     "http://localhost:8080/product/getByName?name=" + event.target.value
  //   );
  //   setProducts(result.data);
  //   setFilterValue(event.target.value);
  // }, 900);

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSortValue(event.target.value);
  };

  const filterProductsHandler = async () => {
    let url = "http://localhost:8080/product/";
    if (sortValue.length > 0) {
      url += "filter?name=" + filterValue + "&lat=";
      const splitedNumbers = sortValue.split("-");
      const lat = parseFloat(splitedNumbers[0]);
      const lon = parseFloat(splitedNumbers[1]);
      url += lat + "&lon=" + lon;
    } else url += "getByName?name=" + filterValue;
    const result = await axios.get(url);
    setProducts(result.data);
  };

  return (
    <>
      <div className="filtering-section">
        {/* <h2>Filtering/sorting section</h2> */}
        <div className="filtering">
          <label>Filter by name: </label>
          <input type="text" onChange={handleInputChange} />
        </div>
        <div className="sorting">
          <label>Nearest to coordinates: </label>
          <p id="coordinatesnote">
            Coordinates must be in form of number-number e.x. 211.22-37.888
          </p>
          <input onChange={handleSortingChange} />
        </div>
        <button id="filterButton" onClick={filterProductsHandler}>
          Filter
        </button>
      </div>
      <Card className="products">
        <ProductList items={products} />
      </Card>
    </>
  );
}
