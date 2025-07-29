import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminWishlist() {
  const [allWishlistItems, setAllWishlistItems] = useState([]);

  useEffect(() => {
    fetchAllWishlistItems();
  }, []);

  const fetchAllWishlistItems = () => {
    try {
      const wishlistItems = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pharmacy_wishlist_')) {
          const userWishlist = JSON.parse(localStorage.getItem(key));
          const username = key.replace('pharmacy_wishlist_', '');
          userWishlist.forEach(item => {
            wishlistItems.push({ ...item, username: username });
          });
        }
      }
      setAllWishlistItems(wishlistItems);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load wishlist items.');
    }
  };

  return (
    <div>
      <h1>Wishlist Overview</h1>
      {allWishlistItems.length === 0 ? (
        <p>No items in any user's wishlist.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>User</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {allWishlistItems.map((item, index) => (
              <tr key={item._id + index}> {/* Use index as well for unique key if product can be in multiple wishlists */}
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>${item.price}</td>
                <td><img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminWishlist;
