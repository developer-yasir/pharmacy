import React from 'react';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage products, orders, and users.</p>
      <ul>
        <li><a href="/admin/products">Manage Products</a></li>
        <li><a href="/admin/orders">Manage Orders</a></li>
        {/* Add more admin links as needed */}
      </ul>
    </div>
  );
}

export default AdminDashboard;
