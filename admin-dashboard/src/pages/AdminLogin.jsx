import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      navigate('/'); // Redirect to admin dashboard on successful login
    } else {
      // Toast message already handled in AuthContext
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Admin Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Admin Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;