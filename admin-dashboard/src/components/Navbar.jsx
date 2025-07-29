import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Admin Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reviews">Reviews</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist-overview">Wishlist</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feedback">Feedback</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/newsletter">Newsletter</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activity-log">Activity Log</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/backup-restore">Backup/Restore</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello, {user.username}
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                  </ul>
                </li>
              </>
            ) : (
              // No login link needed as it's direct access
              <li className="nav-item">
                <span className="nav-link">Welcome Admin!</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;