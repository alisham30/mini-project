import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/" + id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/cart/add", {
      productId: id, quantity: 1
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => navigate("/cart"));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <img src={"http://localhost:5000/" + product.image} alt={product.name} style={{ width: 300 }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>₹{product.price}</strong></p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;