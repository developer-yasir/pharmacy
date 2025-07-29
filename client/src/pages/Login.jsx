import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { identifier, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await login(identifier, password);
    if (success) {
      navigate('/'); // Redirect to home or dashboard on successful login
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="identifier" className="form-label">Phone Number, Email, or Username</label>
            <input
              type="text"
              className="form-control"
              id="identifier"
              name="identifier"
              value={identifier}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"} // Toggle type
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"} {/* Simple text toggle */}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
