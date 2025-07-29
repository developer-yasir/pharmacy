import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store feedback in localStorage
    try {
      const existingFeedback = JSON.parse(localStorage.getItem('pharmacy_feedback')) || [];
      const newFeedback = { ...formData, _id: `feedback_${Date.now()}`, createdAt: new Date().toISOString() };
      existingFeedback.push(newFeedback);
      localStorage.setItem('pharmacy_feedback', JSON.stringify(existingFeedback));
      toast.success('Your message has been sent!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <p className="lead text-center">We'd love to hear from you!</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-bold">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={onChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
          <div className="mt-4 text-center">
            <p className="text-muted">Our customer service team is available Monday to Friday, 9:00 AM to 5:00 PM (EST).</p>
            <p className="text-muted"><i className="fas fa-phone me-2"></i> + 01 234 567 88 | <i className="fas fa-envelope me-2"></i> info@pharmacyapp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;