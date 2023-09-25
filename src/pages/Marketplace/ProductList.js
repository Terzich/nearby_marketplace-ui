import React from "react";
import "./ProductList.css";
import ProductItem from "./ProductItem";

const ProductList = props => {
    if(props.items.length === 0) {
        return <h2 className="product-list__fallback">Found no expenses.</h2>;
      }
    return <ul className="product-list">{props.items.map(product => <ProductItem key={product.productId} productId={product.productId} title={product.name} 
        amount={product.price} gps={product.gpsCoordinates} decription={product.description} category={product.category.name}
        views = {product.views}/>)}
        </ul>

}

export default ProductList;