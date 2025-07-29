import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    try {
      const allUsers = [];
      // Iterate through all localStorage keys to find user data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Look for pharmacy_orders_ keys to infer users who have placed orders
        if (key.startsWith('pharmacy_orders_')) {
          const username = key.replace('pharmacy_orders_', '');
          allUsers.push({
            _id: username, // Use username as ID for local management
            phoneNumber: `guest_${username}`,
            username: username,
            email: '', // No email stored in this model
            role: 'user', // Assume all these are 'user' roles for now
          });
        }
      }
      // Add a dummy admin user for management purposes if not already present
      const adminExists = allUsers.some(user => user.username === 'AdminUser');
      if (!adminExists) {
        allUsers.push({
          _id: 'admin_local',
          phoneNumber: '0000000000',
          username: 'AdminUser',
          email: 'admin@example.com',
          role: 'admin',
        });
      }

      // Filter out duplicates if any (e.g., if a user has multiple order keys)
      const uniqueUsers = Array.from(new Map(allUsers.map(user => [user.username, user])).values());
      setUsers(uniqueUsers);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load users.');
    }
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete their orders.')) {
      try {
        // Remove user's orders from localStorage
        localStorage.removeItem(`pharmacy_orders_${id}`);
        // If the user is the dummy admin, don't delete the admin entry itself, just reset
        if (id === 'admin_local') {
          toast.info('Cannot delete the default local admin user.');
        } else {
          setUsers(users.filter(user => user._id !== id));
          toast.success('User and their orders removed successfully!');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete user.');
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update user in local state (no persistence beyond this browser session for individual user edits)
    setUsers(users.map(user => user._id === editingUser._id ? { ...user, ...formData } : user));
    toast.success('User updated locally!');
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(user)}
                    disabled={user.username === 'AdminUser'} // Prevent editing dummy admin
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                    disabled={user.username === 'AdminUser'} // Prevent deleting dummy admin
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label htmlFor="editUsername" className="form-label">Username</label>
              <input type="text" className="form-control" id="editUsername" name="username" value={formData.username} onChange={handleEditChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="editPhoneNumber" className="form-label">Phone Number</label>
              <input type="text" className="form-control" id="editPhoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleEditChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="editEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="editEmail" name="email" value={formData.email} onChange={handleEditChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="editRole" className="form-label">Role</label>
              <select className="form-select" id="editRole" name="role" value={formData.role} onChange={handleEditChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button variant="primary" type="submit">Save Changes</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserManagement;
