import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function UsernameModal() {
  const { username, setUsername } = useContext(UserContext);
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = inputName.trim();
    if (trimmedName) {
      // Simple client-side check for uniqueness based on existing cart data
      const existingCartKeys = Object.keys(localStorage).filter(key => key.startsWith('pharmacy_cart_'));
      const existingUsernames = existingCartKeys.map(key => key.replace('pharmacy_cart_', ''));

      if (existingUsernames.includes(trimmedName)) {
        setError('This username is already taken. Please choose another.');
        return;
      }

      setUsername(trimmedName);
      setError(''); // Clear error on success
    } else {
      setError('Please enter a valid name.');
    }
  };

  if (username) {
    return null; // Don't render if username is already set
  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Welcome to Pharmacy App!</h5>
          </div>
          <div className="modal-body">
            <p>Please enter your name to continue.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsernameModal;
