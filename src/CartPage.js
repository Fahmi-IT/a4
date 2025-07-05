import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import "./App.css";

export default function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

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

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {groupedItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {groupedItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong> — ${item.price.toFixed(2)} x {item.quantity}
                </div>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button
            className="proceed-payment-btn"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}
