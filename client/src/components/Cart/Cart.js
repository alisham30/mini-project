import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data));
  }, []);

  if (!cart) return <div>Loading...</div>;

  const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="shop-now-btn" onClick={() => navigate('/products')}>Shop Now</button>
          </div>
        ) : (
          cart.items.map(item => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.image} alt={item.productId.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.productId.name}</h3>
                <p className="item-price">₹{item.productId.price}</p>
                <div className="quantity-controls">
                  <button className="quantity-btn">-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-btn">+</button>
                </div>
              </div>
              <div className="item-total">
                <p>Total</p>
                <p className="total-amount">₹{item.productId.price * item.quantity}</p>
              </div>
              <button className="remove-btn">×</button>
            </div>
          ))
        )}
      </div>
      {cart.items.length > 0 && (
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;