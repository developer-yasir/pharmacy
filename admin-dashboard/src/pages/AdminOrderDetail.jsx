import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminOrderDetail() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      let foundOrder = null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_orders_')) {
          const userOrders = JSON.parse(localStorage.getItem(key));
          foundOrder = userOrders.find(o => o._id === id);
          if (foundOrder) break;
        }
      }

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found.');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load order details.');
      setLoading(false);
      toast.error('Failed to load order details.');
    }
  }, [id]);

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
        <p><strong>User:</strong> {order.guestUsername || 'N/A'}</p>
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
        <Link to="/orders" className="btn btn-secondary">Back to Orders</Link>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
