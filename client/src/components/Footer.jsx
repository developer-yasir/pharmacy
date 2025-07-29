import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 py-4 border-top">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <h5 className="text-uppercase text-primary mb-3">Pharmacy App</h5>
            <p className="text-muted">
              Your trusted online pharmacy for all your healthcare needs. We provide quality medicines and exceptional service.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase text-dark mb-3">Shop</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/products" className="text-muted text-decoration-none">All Products</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted text-decoration-none">Wishlist</Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted text-decoration-none">My Orders</Link>
              </li>
              <li>
                <Link to="/recently-viewed" className="text-muted text-decoration-none">Recently Viewed</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase text-dark mb-3">Information</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/about" className="text-muted text-decoration-none">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted text-decoration-none">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted text-decoration-none">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted text-decoration-none">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <h5 className="text-uppercase text-dark mb-3">Contact</h5>
            <ul className="list-unstyled mb-0 text-muted">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> 123 Pharmacy Lane, New York, NY 10012, US
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> info@pharmacyapp.com
              </li>
              <li>
                <i className="fas fa-phone me-2"></i> + 01 234 567 88
              </li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-primary me-3"><i className="fab fa-facebook-f fa-lg"></i></a>
              <a href="#" className="text-primary me-3"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#" className="text-primary me-3"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-primary"><i className="fab fa-linkedin-in fa-lg"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-secondary-light text-muted" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Pharmacy App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;