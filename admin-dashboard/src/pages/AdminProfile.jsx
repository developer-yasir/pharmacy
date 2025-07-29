import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function AdminProfile() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    // No password field for local admin profile as it's hardcoded
  });

  console.log('AdminProfile Component - Initial user from context:', user);

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email || '' });
    }
  }, [user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // For localStorage-only admin, we just update the local user object
    // and persist it if necessary (though our AuthContext already sets a dummy).
    // In a real app, this would be an API call.
    if (formData.username.trim()) {
      const updatedUser = { ...user, username: formData.username.trim(), email: formData.email.trim() };
      setUser(updatedUser); // Update context
      // No need to update localStorage for admin user as it's a dummy in AuthContext
      toast.success('Admin profile updated locally!');
    } else {
      toast.error('Username cannot be empty.');
    }
  };

  if (!user) {
    return <p>Loading admin profile...</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Admin Profile</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;