import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartContext } from "./contexts/CartContext";
import "./App.css";

export default function PaymentPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s+/g, "")))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      newErrors.expiry = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(form.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const increaseQty = (item) => {
    setCartItems([...cartItems, item]);
  };

  const decreaseQty = (item) => {
    const index = cartItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Get quantity summary
  const groupedCart = cartItems.reduce((acc, item) => {
    const key = item.id;
    if (!acc[key]) acc[key] = { ...item, quantity: 0 };
    acc[key].quantity++;
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);

  if (submitted) {
    submitted && (
    <div className="payment-page">
    <Navbar />
    <h1>Payment Successful</h1>
    <p>Thank you for your purchase!</p>
    <button
      className="proceed-review-btn"
      onClick={() => navigate("/review")}
    >
      Leave a Review
    </button>
    </div>
)}

  return (
    <div className="payment-page">
      <h1>Payment Details</h1>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {groupedItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {groupedItems.map((item) => (
              <li key={item.id}>
                {item.name} — ${item.price.toFixed(2)} x {item.quantity}
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Name on Card
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Card Number
          <input
            type="text"
            name="cardNumber"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && (
            <span className="error">{errors.cardNumber}</span>
          )}
        </label>

        <label>
          Expiry (MM/YY)
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength={5}
            value={form.expiry}
            onChange={handleChange}
          />
          {errors.expiry && <span className="error">{errors.expiry}</span>}
        </label>

        <label>
          CVV
          <input
            type="password"
            name="cvv"
            maxLength={4}
            value={form.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </label>

        <button type="submit" className="proceed-payment-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
}
