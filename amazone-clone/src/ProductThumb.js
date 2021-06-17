import React from "react";
import "./ProductThumb.css";
function ProductThumb({ products }) {
  return (
    <div className="product__thumbs">
      {products.map((product, key) => (
        <div className="product__item" key={key}>
          <img
            className="product__itemImage"
            src={product.src}
            alt="Product Image"
          />
          <div className="product__itemType">
            <span className="product__typeText">{product.type}</span>
          </div>
          <a href={product.link} className="product__itemOverlay" />
        </div>
      ))}
    </div>
  );
}

export default ProductThumb;
