import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../App.css";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">NeoStore</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/review">Leave a Review</Link>
          <Link to="/cart" className="cart-link">Cart ({cartItems.length})</Link>
        </div>
      </div>
    </nav>
  );
}