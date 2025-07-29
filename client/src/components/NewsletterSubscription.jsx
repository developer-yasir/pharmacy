import React, { useState } from 'react';
import { toast } from 'react-toastify';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      const existingSubscribers = JSON.parse(localStorage.getItem('pharmacy_newsletter_subscribers')) || [];
      if (existingSubscribers.includes(email.trim())) {
        toast.info('You are already subscribed!');
      } else {
        existingSubscribers.push(email.trim());
        localStorage.setItem('pharmacy_newsletter_subscribers', JSON.stringify(existingSubscribers));
        toast.success('Thank you for subscribing to our newsletter!');
        setEmail('');
      }
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <div className="card p-4 mt-5 shadow-sm">
      <h4 className="card-title text-center mb-3">Subscribe to our Newsletter</h4>
      <p className="text-center text-muted">Get the latest updates and special offers!</p>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="email"
          className="form-control me-2"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
    </div>
  );
}

export default NewsletterSubscription;
