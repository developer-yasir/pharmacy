import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useContext(UserContext);

  useEffect(() => {
    fetchOrders();
  }, [username]);

  const fetchOrders = () => {
    setLoading(true);
    setError(null);
    if (username) {
      try {
        const storedOrders = JSON.parse(localStorage.getItem(`pharmacy_orders_${username}`)) || [];
        setOrders(storedOrders);
      } catch (err) {
        console.error(err);
        setError('Failed to load order history.');
      }
    }
    setLoading(false);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const storedOrders = JSON.parse(localStorage.getItem(`pharmacy_orders_${username}`)) || [];
        const updatedOrders = storedOrders.map(order =>
          order._id === orderId ? { ...order, isDelivered: false, status: 'Cancelled' } : order // Mark as cancelled
        );
        localStorage.setItem(`pharmacy_orders_${username}`, JSON.stringify(updatedOrders));
        toast.success('Order cancelled successfully!');
        fetchOrders(); // Re-fetch orders to update UI
      } catch (err) {
        console.error(err);
        toast.error('Failed to cancel order.');
      }
    }
  };

  if (!username) {
    return <p>Please enter your name to view your order history.</p>;
  }

  if (loading) {
    return <div>Loading order history...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h1>Order History for {username}</h1>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          You have no orders yet. Place an order to see your history!
        </div>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order._id} className="list-group-item mb-3">
              <h5>Order ID: {order._id}</h5>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <p>Status: {order.status || (order.isDelivered ? 'Delivered' : 'Pending')}</p> {/* Display status */}
              <Link to={`/orders/${order._id}`} className="btn btn-info btn-sm me-2">View Details</Link>
              {!order.isDelivered && order.status !== 'Cancelled' && (
                <button className="btn btn-danger btn-sm" onClick={() => handleCancelOrder(order._id)}>
                  Cancel Order
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
