import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import AdminProfile from './pages/AdminProfile';
import UserManagement from './pages/UserManagement';
import AdminReviews from './pages/AdminReviews';
import AdminWishlist from './pages/AdminWishlist';
import AdminFeedback from './pages/AdminFeedback';
import AdminNewsletter from './pages/AdminNewsletter';
import AdminActivityLog from './pages/AdminActivityLog';
import AdminNotifications from './components/AdminNotifications';
import AdminBackupRestore from './pages/AdminBackupRestore'; // Import AdminBackupRestore
import './index.css'; // Import global styles

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/orders/:id" element={<AdminOrderDetail />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/reviews" element={<AdminReviews />} />
          <Route path="/wishlist-overview" element={<AdminWishlist />} />
          <Route path="/feedback" element={<AdminFeedback />} />
          <Route path="/newsletter" element={<AdminNewsletter />} />
          <Route path="/activity-log" element={<AdminActivityLog />} />
          <Route path="/backup-restore" element={<AdminBackupRestore />} /> {/* Add AdminBackupRestore route */}
        </Routes>
      </div>
      <AdminNotifications />
    </Router>
  );
}

export default App;