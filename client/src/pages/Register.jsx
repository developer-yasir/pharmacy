import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { phoneNumber, name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await register(phoneNumber, name, email, password, 'user'); // Default role to 'user'
    if (success) {
      navigate('/'); // Redirect to home on successful registration
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address (Optional)</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
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
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
