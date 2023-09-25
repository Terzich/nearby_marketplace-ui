import React, {useState, useEffect} from "react";
import "./ProductItem.css";
import axios from "axios";
import ProductDate from "./ProductDate";
import Card from "../../Card/Card";
import ProductDetails from "./ProductDetails";
import productImage from "../../Product.jpg";


const ProductItem = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);

  const productInfo = {
    id: props.productId,
    name: props.title,
    price: props.amount,
    description: props.description,
    gps: props.gps,
    category: props.category,
    views: props.views
  }

  useEffect(() => {
    loadPriceHistory();
  }, []);

  const loadPriceHistory = async () => {
    const result = await axios.get("http://localhost:8080/pricehistory/" + props.productId);
    console.log(result.data);
    setPriceHistory(result.data);
  };
  
  return (
    <>
    <li onClick={() => setIsOpen(true)}>
      <Card className="product-item">
        {/* <ProductDate date={props.date} /> */}
        <img src={productImage} width="20%"></img>
        <div className="product-item__description">
          <h2>{props.title}</h2>
          <div className="product-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
      <ProductDetails open={isOpen} onClose={() => setIsOpen(false)} productObj = {productInfo} priceHistory={priceHistory}></ProductDetails>
    </>
  );
};

export default ProductItem;
