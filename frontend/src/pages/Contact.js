import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        
        {/* Left Side */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Experiencing an issue or have a business inquiry? Drop us a message and our support team will get back to you within 24 hours.</p>
          
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>123 VitalSync Ave, Tech Park</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <span>support@vitalsync.com</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form-section">
          <h2>Send a Message</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            
            <div className="input-box">
              <input type="text" required />
              <label>Full Name</label>
            </div>

            <div className="input-box">
              <input type="email" required />
              <label>Email Address</label>
            </div>

            <div className="input-box">
              <textarea rows="4" required></textarea>
              <label>Your Message</label>
            </div>

            <button type="submit" className="submit-btn">Send Message 🚀</button>
          </form>
        </div>

      </div>
    </div>
  );
}