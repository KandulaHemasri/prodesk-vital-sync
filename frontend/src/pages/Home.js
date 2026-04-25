import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

 const handleBook = () => {
  if (user) {
    navigate("/doctors"); 
  } else {
    navigate("/login");     
  }
};

const handleExplore = () => {
  navigate("/about"); 
};

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-left">
          <h1>Healthcare Made Simple & Smart</h1>
          <p>
            Book appointments, manage records, and connect with trusted doctors —
            all in one platform.
          </p>

          <div className="hero-buttons">
           <button className="primary-btn" onClick={handleBook}>
            Book Appointment
           </button>

            <button className="secondary-btn" onClick={handleExplore}>
            {user ? "Explore" : "Get Started"}
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
            alt="health"
          />
        </div>
      </section>


      <section className="stats">
        <div>
          <h2>100+</h2>
          <p>Doctors</p>
        </div>
        <div>
          <h2>5000+</h2>
          <p>Patients</p>
        </div>
        <div>
          <h2>24/7</h2>
          <p>Support</p>
        </div>
      </section>


      <section className="features">
        <h2>Why Choose VitalSync?</h2>

        <div className="features-grid">
          <div className="feature-box">📅 Easy Appointments</div>
          <div className="feature-box">📊 Health Tracking</div>
          <div className="feature-box">💊 Digital Prescriptions</div>
          <div className="feature-box">⚡ Real-Time Updates</div>
        </div>
      </section>


      <section className="doctors">
        <h2>Top Doctors</h2>

        <div className="doctor-grid">
          {["Dr. Saba", "Dr. Ahmed", "Dr. Usman", "Dr. Ali"].map((doc, i) => (
            <div key={i} className="doctor-card">
              <div className="avatar"></div>
              <h3>{doc}</h3>
              <p>Specialist</p>
              <span className="available">Available</span>
            </div>
          ))}
        </div>
      </section>

<section className="testimonial">
  <h2>What Our Patients Say</h2>

  <div className="testimonial-wrapper">


    <div className="testimonial-card small">
      <p>
        “Very smooth experience. Booking appointments is now super easy.”
      </p>
      <h4>— Rahul</h4>
    </div>


    <div className="testimonial-card main">
      <p>
        “VitalSync completely changed how I manage my healthcare.
        No more waiting lines, everything is just one click away!”
      </p>
      <h4>— Riya Sharma</h4>
    </div>


    <div className="testimonial-card small">
      <p>
        “Doctors are reliable and the system is very efficient.”
      </p>
      <h4>— Sneha</h4>
    </div>

  </div>
</section>

 

  <footer className="footer">
  <div className="footer-container">

  
    <div className="footer-brand">
      <h2>VitalSync</h2>
      <p>
        Smart healthcare platform to book appointments, manage records,
        and connect with trusted doctors anytime.
        Simplifying healthcare access through smart appointment management. 
        Book your doctor, anytime, anywhere with Prescripto's intelligent scheduling system. 
        No more long waits or booking hassles - just efficient, reliable, 
        and patient-focused healthcare at your convenience
      </p>
    </div>


    <div className="footer-links">
      <h3>Company</h3>
      <p>Home</p>
      <p>About</p>
      <p>Contact</p>
    </div>

  
    <div className="footer-contact">
      <h3>Contact</h3>
      <p>📞 +91 9347106953</p>
      <p>📧 vitalsync@gmail.com</p>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 VitalSync. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;