import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartContext from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Cart cleared!');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty. Start shopping to add items!
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.product._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.product.name}</h5>
                    <p>${item.product.price} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.countInStock}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                </li>
              ))}
            </ul>
            <button className="btn btn-warning mt-3" onClick={handleClearCart}>Clear Cart</button>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Order Summary</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total Items</span>
                    <strong>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>${calculateTotal()}</strong>
                  </li>
                </ul>
                <button className="btn btn-success w-100 mt-3" onClick={handleCheckout} disabled={cartItems.length === 0}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;