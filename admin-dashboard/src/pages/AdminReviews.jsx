import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminReviews() {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = () => {
    try {
      const reviews = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('product_reviews_')) {
          const productReviews = JSON.parse(localStorage.getItem(key));
          reviews.push(...productReviews.map(review => ({ ...review, productId: key.replace('product_reviews_', '') })));
        }
      }
      setAllReviews(reviews);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load reviews.');
    }
  };

  const deleteReview = (reviewId, productId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const storedReviews = JSON.parse(localStorage.getItem(`product_reviews_${productId}`)) || [];
        const updatedReviews = storedReviews.filter(review => review._id !== reviewId);
        localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(updatedReviews));
        toast.success('Review deleted successfully!');
        fetchAllReviews();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete review.');
      }
    }
  };

  return (
    <div>
      <h1>Review Management</h1>
      {allReviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map((review) => (
              <tr key={review._id}>
                <td>{review.productId}</td>
                <td>{review.username}</td>
                <td>{review.rating} Stars</td>
                <td>{review.comment}</td>
                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteReview(review._id, review.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminReviews;
