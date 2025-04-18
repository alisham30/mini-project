import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const placeOrder = () => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/orders/create", {
      products: [],
      total: 100
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => navigate("/success"));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Confirm Your Order</h2>
      <p>Review your cart and confirm to place order.</p>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;