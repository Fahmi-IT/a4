import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faStore, faHouse, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../App.css";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/assets/neo_icon.png" alt="NeoStore Logo" />
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHouse} size="lg" />
            <span className="tooltip">Home</span>
          </Link>
          <Link to="/marketplace" className="nav-link">
          <FontAwesomeIcon icon={faStore} size="lg" />
          <span className="tooltip">Marketplace</span>
          </Link>
          <Link to="/review" className="nav-link">
            <FontAwesomeIcon icon={faComment} size="lg" />
            <span className="tooltip">Leave a Review</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="tooltip">Cart</span>
            <p style={{ display: 'inline', marginLeft: '6px', color: 'white' }}>({cartItems.length})</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}