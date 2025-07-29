import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    try {
      const storedFeedback = JSON.parse(localStorage.getItem('pharmacy_feedback')) || [];
      setFeedback(storedFeedback);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load feedback.');
    }
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const updatedFeedback = feedback.filter(item => item._id !== id);
        localStorage.setItem('pharmacy_feedback', JSON.stringify(updatedFeedback));
        toast.success('Feedback deleted successfully!');
        setFeedback(updatedFeedback);
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete feedback.');
      }
    }
  };

  return (
    <div>
      <h1>User Feedback</h1>
      {feedback.length === 0 ? (
        <p>No user feedback submitted yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteFeedback(item._id)}
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

export default AdminFeedback;
