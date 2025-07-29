import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios'; // No longer needed
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';

function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { username } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (username && id) {
      try {
        const storedOrders = JSON.parse(localStorage.getItem(`pharmacy_orders_${username}`)) || [];
        const foundOrder = storedOrders.find(o => o._id === id);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Order not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load order details.');
      }
    }
    setLoading(false);
  }, [username, id]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!order) {
    return <div className="alert alert-info">Order not found.</div>;
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        Order ID: {order._id}
      </div>
      <div className="card-body">
        <h5 className="card-title">Order Details</h5>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.isDelivered ? 'Delivered' : 'Pending'}</p>

        <h6>Shipping Address:</h6>
        <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>

        <h6>Payment Method:</h6>
        <p>{order.paymentMethod}</p>

        <h6>Order Items:</h6>
        <ul className="list-group mb-3">
          {order.orderItems.map((item) => (
            <li key={item.product} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.name} x {item.qty}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderDetail;