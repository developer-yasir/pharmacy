import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = () => {
    try {
      const storedSubscribers = JSON.parse(localStorage.getItem('pharmacy_newsletter_subscribers')) || [];
      setSubscribers(storedSubscribers);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load newsletter subscribers.');
    }
  };

  const deleteSubscriber = (email) => {
    if (window.confirm(`Are you sure you want to delete ${email} from the newsletter list?`)) {
      try {
        const updatedSubscribers = subscribers.filter(sub => sub !== email);
        localStorage.setItem('pharmacy_newsletter_subscribers', JSON.stringify(updatedSubscribers));
        toast.success('Subscriber deleted successfully!');
        setSubscribers(updatedSubscribers);
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete subscriber.');
      }
    }
  };

  return (
    <div>
      <h1>Newsletter Subscribers</h1>
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((email, index) => (
              <tr key={index}>
                <td>{email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSubscriber(email)}
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

export default AdminNewsletter;
