import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { username } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (username) {
      const storedWishlist = JSON.parse(localStorage.getItem(`pharmacy_wishlist_${username}`)) || [];
      setWishlistItems(storedWishlist);
    }
  }, [username]);

  const removeFromWishlist = (productId) => {
    if (!username) return;
    const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
    localStorage.setItem(`pharmacy_wishlist_${username}`, JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    toast.info('Product removed from wishlist.');
  };

  const moveAllToCart = () => {
    if (!username) return;
    wishlistItems.forEach(item => {
      addToCart(item, 1); // Add each item with quantity 1
    });
    localStorage.removeItem(`pharmacy_wishlist_${username}`); // Clear wishlist after moving
    setWishlistItems([]);
    toast.success('All items moved to cart!');
  };

  if (!username) {
    return <p>Please enter your name to view your wishlist.</p>;
  }

  return (
    <div>
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your wishlist is empty. Add some products you love!
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary mb-3" onClick={moveAllToCart}>
              Move All to Cart
            </button>
            <ul className="list-group mb-3">
              {wishlistItems.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }} />
                    <div>
                      <h5>{item.name}</h5>
                      <p>${item.price}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/products/${item._id}`} className="btn btn-info btn-sm me-2">View</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromWishlist(item._id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
