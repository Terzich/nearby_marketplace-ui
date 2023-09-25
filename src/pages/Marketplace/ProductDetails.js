import React, { useState } from "react";
import ReactDom from "react-dom";
import productImage from "../../Product.jpg";
import "./ProductDetails.css";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "70%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function ProductDetails({
  open,
  children,
  onClose,
  productObj,
  priceHistory
}) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className="modal_styles">
        <h1 id="productname">{productObj.name}</h1>
        <div className="modal-content">
          <img src={productImage} alt="Product" className="productImage" />
          <div className="product-details">
            <p id="price">Price: ${productObj.price}</p>
            <p>Category: {productObj.category}</p>
            <p>Description: {productObj.description}</p>
            <p>Coordinates: {productObj.gps}</p>
            <p>
              Number of views: <span color="red">{productObj.views}</span>
            </p>
          </div>
          <div className="price-history-details">
            <h4>Price history of the product</h4>
            <table className="price-history-table">
              <thead>
                <tr>
                  <th>DateTime</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {priceHistory.map(ph => <tr><td>{ph.timestamp}</td><td>{ph.price}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
