import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About VitalSync</h1>
        <p>Revolutionizing healthcare by connecting patients and doctors seamlessly. We believe in accessible, efficient, and reliable medical care for everyone.</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>🩺 Our Mission</h3>
          <p>To eliminate healthcare friction by offering a unified sync platform that allows patients to track, book, and manage their health instantly.</p>
        </div>

        <div className="about-card">
          <h3>👁️ Our Vision</h3>
          <p>A world where medical delays are a thing of the past. VitalSync aims to bring hospital-grade scheduling tools right to the fingertips of the patient.</p>
        </div>

        <div className="about-card">
          <h3>⭐ Core Values</h3>
          <p>Empathy, Innovation, and Security. Every line of code we write is dedicated to protecting patient data and improving outcomes across the ecosystem.</p>
        </div>
      </div>
    </div>
  );
}