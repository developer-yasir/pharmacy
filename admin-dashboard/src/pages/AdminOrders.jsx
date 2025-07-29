import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    try {
      let allOrders = [];
      // Iterate through all localStorage keys to find orders for all users
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_orders_')) {
          const userOrders = JSON.parse(localStorage.getItem(key));
          allOrders.push(...userOrders);
        }
      }

      // Apply search and filter
      let filteredOrders = allOrders.filter(order => {
        const matchesSearch = searchTerm === '' || 
                              order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (order.guestUsername && order.guestUsername.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === '' || 
                              (filterStatus === 'delivered' && order.isDelivered) ||
                              (filterStatus === 'pending' && !order.isDelivered);
        return matchesSearch && matchesStatus;
      });

      // Sort orders by creation date (newest first)
      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(filteredOrders);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const markAsDelivered = (orderId) => {
    try {
      let updated = false;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_orders_')) {
          let userOrders = JSON.parse(localStorage.getItem(key));
          const orderIndex = userOrders.findIndex(order => order._id === orderId);
          if (orderIndex !== -1) {
            userOrders[orderIndex].isDelivered = true;
            userOrders[orderIndex].deliveredAt = new Date().toISOString();
            localStorage.setItem(key, JSON.stringify(userOrders));
            updated = true;
            break;
          }
        }
      }
      if (updated) {
        toast.success('Order marked as delivered!');
        fetchOrders(); // Re-fetch all orders to update the list
      } else {
        toast.error('Order not found.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order status.');
    }
  };

  return (
    <div>
      <h1>Manage Orders</h1>

      <form onSubmit={handleSearch} className="mb-4 row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="orderSearch" className="form-label">Search Orders</label>
          <input
            type="text"
            id="orderSearch"
            className="form-control"
            placeholder="Search by ID or Username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="orderStatusFilter" className="form-label">Filter by Status</label>
          <select
            id="orderStatusFilter"
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Apply Filter</button>
        </div>
      </form>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td><Link to={`/orders/${order._id}`}>{order._id}</Link></td>
                <td>{order.guestUsername || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}
                </td>
                <td>
                  {!order.isDelivered && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => markAsDelivered(order._id)}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
