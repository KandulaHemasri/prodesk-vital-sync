import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <span className="about-label">Crafted for a Better Healthcare Experience</span>
        <h1>Crafting precision in medical administration</h1>
        <p>At VitalSync, we focus on the intersection of professional efficiency and patient care. Our platform is more than just software — it is a digital architect for modern medical teams.</p>
      </div>

      <div className="about-feature-grid">
        <div className="feature-card">
          <h3>Patient Management</h3>
          <p>Comprehensive records and intake flows designed for accuracy and speed in high-volume environments.</p>
        </div>
        <div className="feature-card">
          <h3>Hassle-Free Scheduling</h3>
          <p>Choose your preferred time, avoid clashes, and manage all your appointments in one place.</p>
        </div>
        <div className="feature-card">
          <h3>Appointment Booking</h3>
          <p>Seamless consultation scheduling for patients with automated reminders and multi-channel intake.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Records</h3>
          <p>HIPAA-compliant encryption and storage protocols ensure patient confidentiality at all times.</p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat-card">
          <strong>500+</strong>
          <span>Hospitals Integrated</span>
        </div>
        <div className="stat-card">
          <strong>1.2M</strong>
          <span>Patients Managed</span>
        </div>
        <div className="stat-card">
          <strong>24/7</strong>
          <span>Care coordination support</span>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>To eliminate healthcare friction by offering a unified platform that allows patients and providers to connect faster and more confidently.</p>
        </div>
        <div className="about-card">
          <h3>Our Vision</h3>
          <p>A healthier future where technology reduces administrative burden and empowers clinicians to focus on care.</p>
        </div>
        <div className="about-card">
          <h3>Core Values</h3>
          <p>Empathy, innovation, and security guide every feature we create, from intake through follow-up.</p>
        </div>
      </div>
    </div>
  );
}