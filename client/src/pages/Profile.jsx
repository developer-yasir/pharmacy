import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { username, setUsername } = useContext(UserContext);
  const [inputName, setInputName] = useState(username);
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      setInputName(username);
      const storedPic = localStorage.getItem(`pharmacy_profile_pic_${username}`);
      if (storedPic) {
        setProfilePicture(storedPic);
      }
    }
  }, [username]);

  const onChange = (e) => {
    if (e.target.name === "profilePicture") {
      setProfilePicture(e.target.value);
    } else if (e.target.name === "nameInput") {
      setInputName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = inputName.trim();
    if (trimmedName) {
      if (trimmedName !== username) {
        const oldCart = localStorage.getItem(`pharmacy_cart_${username}`);
        if (oldCart) {
          localStorage.setItem(`pharmacy_cart_${trimmedName}`, oldCart);
          localStorage.removeItem(`pharmacy_cart_${username}`);
        }
        const oldOrders = localStorage.getItem(`pharmacy_orders_${username}`);
        if (oldOrders) {
          localStorage.setItem(`pharmacy_orders_${trimmedName}`, oldOrders);
          localStorage.removeItem(`pharmacy_orders_${username}`);
        }
        const oldWishlist = localStorage.getItem(`pharmacy_wishlist_${username}`);
        if (oldWishlist) {
          localStorage.setItem(`pharmacy_wishlist_${trimmedName}`, oldWishlist);
          localStorage.removeItem(`pharmacy_wishlist_${username}`);
        }
        const oldViewed = localStorage.getItem(`pharmacy_recently_viewed_${username}`);
        if (oldViewed) {
          localStorage.setItem(`pharmacy_recently_viewed_${trimmedName}`, oldViewed);
          localStorage.removeItem(`pharmacy_recently_viewed_${username}`);
        }
        const oldProfilePic = localStorage.getItem(`pharmacy_profile_pic_${username}`);
        if (oldProfilePic) {
          localStorage.setItem(`pharmacy_profile_pic_${trimmedName}`, oldProfilePic);
          localStorage.removeItem(`pharmacy_profile_pic_${username}`);
        }

        setUsername(trimmedName);
      }

      localStorage.setItem(`pharmacy_profile_pic_${trimmedName || username}`, profilePicture);
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Please enter a valid name.');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? All your data will be removed from this browser.')) {
      localStorage.removeItem(`pharmacy_cart_${username}`);
      localStorage.removeItem(`pharmacy_orders_${username}`);
      localStorage.removeItem(`pharmacy_wishlist_${username}`);
      localStorage.removeItem(`pharmacy_recently_viewed_${username}`);
      localStorage.removeItem(`pharmacy_profile_pic_${username}`);
      localStorage.removeItem('pharmacy_username');

      setUsername('');
      toast.success('Account deleted successfully from this browser.');
      navigate('/');
    }
  };

  if (!username) {
    return <p>Please enter your name to view your profile.</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="text-center mb-4">Your Profile</h1>
        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
              <img 
                src={profilePicture || 'https://via.placeholder.com/150?text=No+Image'} 
                alt="Profile" 
                className="rounded-circle mb-3 border border-primary p-1" 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <label htmlFor="profilePicture" className="form-label fw-bold">Profile Picture URL</label>
              <input
                type="text"
                className="form-control"
                id="profilePicture"
                name="profilePicture"
                value={profilePicture}
                onChange={onChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label fw-bold">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="nameInput"
                value={inputName}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">Update Profile</button>
            <button type="button" className="btn btn-danger w-100 mt-2" onClick={handleDeleteAccount}>Delete Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;