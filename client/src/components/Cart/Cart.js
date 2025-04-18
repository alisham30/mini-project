import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/add', 
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  if (loading) return <div className="cart-container">Loading...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="shop-now-btn" onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => 
    sum + (item.productId.price * item.quantity), 0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.productId._id} className="cart-item">
            <img 
              src={`http://localhost:5000/${item.productId.image}`} 
              alt={item.productId.name} 
              className="cart-item-image" 
            />
            <div className="cart-item-details">
              <h3>{item.productId.name}</h3>
              <p className="item-price">₹{item.productId.price}</p>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-total">
              <p>Total</p>
              <p className="total-amount">
                ₹{item.productId.price * item.quantity}
              </p>
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.productId._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default Cart;