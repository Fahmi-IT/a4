import React, { useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import { Link } from "react-router-dom";
import "./App.css";

export default function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Group and count
  const groupedCart = cartItems.reduce((acc, item) => {
    const key = item.id;
    if (!acc[key]) acc[key] = { ...item, quantity: 0 };
    acc[key].quantity++;
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);
  const subtotal = groupedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Cart</h1>

      <div className="cart-container">
        {groupedItems.length === 0 ? (
          <div className="cart-empty">Your cart is empty.
          <br />
          <Link to="/marketplace" className="browse-button">
            Browse Products
          </Link>
          </div>
        ) : (
          <div className="cart-items">
            {groupedItems.map((item) => (
        <div key={item.id} className="cart-row fade-in">
          <div className="cart-col cart-product">{item.name}</div>

          <div className="cart-col cart-quantity-controls">
            <button onClick={() => decreaseQty(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item)}>+</button>
          </div>

          <div className="cart-col cart-price">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )}

  {groupedItems.length > 0 && (
    <div className="cart-subtotal">
      <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
    </div>
  )}

  {groupedItems.length > 0 && (
    <div className="cart-actions">
      <Link to="/payment" className="proceed-button">
        Proceed to Payment
      </Link>
    </div>
  )}
</div>
    </div>
  );
}