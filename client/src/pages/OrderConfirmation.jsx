import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    }
  }, [location.state]);

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4 shadow-sm">
        <h1 className="card-title text-success mb-3"><i className="fas fa-check-circle me-2"></i>Order Placed Successfully!</h1>
        <p className="card-text lead">Thank you for your purchase.</p>
        {orderId && <p className="card-text">Your Order ID is: <strong>{orderId}</strong></p>}
        <p className="card-text">You will receive an email confirmation shortly.</p>
        <div className="mt-4">
          <Link to="/orders" className="btn btn-primary me-3">View My Orders</Link>
          <Link to="/products" className="btn btn-outline-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
