import React, { useState, useEffect } from "react";
import "./style.css";

const CartPopup = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
  }, [isOpen]);

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const buyAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    alert("Compra realizada com sucesso!");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal cart-modal">
      <div className="modal-content cart-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Carrinho:</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong> - Preço: {item.price}
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
        {cartItems.length > 0 && (
          <button onClick={buyAll} className="buy-all-button">
            Realizar Compra
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
