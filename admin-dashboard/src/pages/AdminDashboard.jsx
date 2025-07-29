import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalReviews: 0,
    totalWishlistItems: 0,
    totalSubscribers: 0,
  });

  useEffect(() => {
    // Simulate fetching stats from localStorage
    const fetchStats = () => {
      let productsCount = 0;
      const storedProducts = JSON.parse(localStorage.getItem('admin_products'));
      if (storedProducts) {
        productsCount = storedProducts.length;
      }

      let ordersCount = 0;
      let totalRevenue = 0;
      let pendingOrders = 0;
      let deliveredOrders = 0;
      let usersCount = 0;
      const uniqueUsers = new Set();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_orders_')) {
          const userOrders = JSON.parse(localStorage.getItem(key));
          ordersCount += userOrders.length;
          userOrders.forEach(order => {
            totalRevenue += order.totalPrice;
            uniqueUsers.add(order.guestUsername);
            if (order.isDelivered) {
              deliveredOrders++;
            } else {
              pendingOrders++;
            }
          });
        }
      }
      uniqueUsers.add('AdminUser'); // Add the dummy admin user
      usersCount = uniqueUsers.size;

      let totalReviews = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('product_reviews_')) {
          const productReviews = JSON.parse(localStorage.getItem(key));
          totalReviews += productReviews.length;
        }
      }

      let totalWishlistItems = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_wishlist_')) {
          const userWishlist = JSON.parse(localStorage.getItem(key));
          totalWishlistItems += userWishlist.length;
        }
      }

      const storedSubscribers = JSON.parse(localStorage.getItem('pharmacy_newsletter_subscribers')) || [];
      const totalSubscribers = storedSubscribers.length;

      setStats({
        totalProducts: productsCount,
        totalOrders: ordersCount,
        totalUsers: usersCount,
        totalRevenue: totalRevenue.toFixed(2),
        pendingOrders,
        deliveredOrders,
        totalReviews,
        totalWishlistItems,
        totalSubscribers,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage products, orders, and users.</p>

      <div className="row mt-4">
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Products</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalProducts}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Orders</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalOrders}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Total Users</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalUsers}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Total Revenue</div>
            <div className="card-body">
              <h5 className="card-title">${stats.totalRevenue}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Pending Orders</div>
            <div className="card-body">
              <h5 className="card-title">{stats.pendingOrders}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Delivered Orders</div>
            <div className="card-body">
              <h5 className="card-title">{stats.deliveredOrders}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Total Reviews</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalReviews}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Wishlist Items</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalWishlistItems}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Newsletter Subscribers</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalSubscribers}</h5>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Sales Overview (Placeholder Chart)</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p className="text-muted text-center">[Placeholder for a sales chart - e.g., daily/monthly revenue]</p>
          <img src="https://via.placeholder.com/600x300?text=Sales+Chart+Placeholder" alt="Sales Chart Placeholder" className="img-fluid" />
        </div>
      </div>

      <h2 className="mt-4">Product Performance (Placeholder Chart)</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p className="text-muted text-center">[Placeholder for a product performance chart - e.g., top selling products]</p>
          <img src="https://via.placeholder.com/600x300?text=Product+Performance+Chart+Placeholder" alt="Product Performance Chart Placeholder" className="img-fluid" />
        </div>
      </div>

      <h2 className="mt-4">Quick Links:</h2>
      <ul>
        <li><a href="/products">Manage Products</a></li>
        <li><a href="/orders">Manage Orders</a></li>
        <li><a href="/users">Manage Users</a></li>
        <li><a href="/reviews">Manage Reviews</a></li>
        <li><a href="/wishlist-overview">Wishlist Overview</a></li>
        <li><a href="/feedback">User Feedback</a></li>
        <li><a href="/newsletter">Newsletter Subscribers</a></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;