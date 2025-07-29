import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

function FloatingCart() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) {
    return null; // Don't show if cart is empty
  }

  return (
    <div className="floating-cart">
      <Link to="/cart" className="btn btn-primary rounded-circle p-3 shadow-lg">
        <i className="fas fa-shopping-cart"></i>
        <span className="badge bg-danger rounded-pill cart-badge">{totalItems}</span>
      </Link>
    </div>
  );
}

export default FloatingCart;
