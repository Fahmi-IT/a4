import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import { CartContext } from "./contexts/CartContext";
import { Link } from "react-router-dom";
import "./App.css";

export default function PaymentPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
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
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
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
      setCartItems([]);
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

  const groupedCart = cartItems.reduce((acc, item) => {
    const key = item.id;
    if (!acc[key]) acc[key] = { ...item, quantity: 0 };
    acc[key].quantity++;
    return acc;
  }, {});
  const groupedItems = Object.values(groupedCart);

  if (submitted) {
    return (
      <div className="payment-page">
        <h1 className="payment-success">Payment Successful</h1>
        <p className="thanks-message">Thank you for your purchase! <br /> <br />Your receipt has been sent to the provided email address.</p>
        <Link to="/review" className="review-btn-payment">
          Leave a Review
        </Link>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1 className="cart-title">Payment Details</h1>
      <div className="underline"></div>

      <div className="cart-summary-wrapper">
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {groupedItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-summary-list">
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
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
  <div className="form-container">
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
      Email Address
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}
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
      {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
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
  </div>
</form>
    </div>
  );
}
