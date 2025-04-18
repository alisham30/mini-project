import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={"http://localhost:5000/" + product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <Link to={"/product/" + product._id}>View Details</Link>
    </div>
  );
}

export default ProductCard;