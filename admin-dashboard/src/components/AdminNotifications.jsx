import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('admin_notifications')) || [];
    setNotifications(storedNotifications);

    // Simulate new notifications (e.g., new order, low stock)
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New dummy notification: ${new Date().toLocaleTimeString()}`,
        read: false,
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('admin_notifications', JSON.stringify(updated));
        return updated;
      });
      toast.info('New Admin Notification!');
    }, 60000); // Every 1 minute

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    localStorage.setItem('admin_notifications', JSON.stringify(notifications.map(n => n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('admin_notifications');
    toast.info('All notifications cleared.');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="admin-notifications">
      <button className="btn btn-secondary rounded-circle p-3 shadow-lg notification-toggle-btn" onClick={() => setShowNotifications(!showNotifications)}>
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && <span className="badge bg-danger rounded-pill notification-badge">{unreadCount}</span>}
      </button>

      {showNotifications && (
        <div className="notification-window card shadow-lg">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Notifications</strong>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowNotifications(false)}></button>
          </div>
          <div className="card-body notification-list">
            {notifications.length === 0 ? (
              <p className="text-muted text-center">No notifications.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {notifications.map(n => (
                  <li key={n.id} className={`list-group-item ${n.read ? 'text-muted' : ''}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{n.message}</span>
                      {!n.read && (
                        <button className="btn btn-sm btn-outline-primary" onClick={() => markAsRead(n.id)}>
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <small className="text-muted">{new Date(n.timestamp).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-sm btn-outline-danger" onClick={clearAll} disabled={notifications.length === 0}>Clear All</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;
