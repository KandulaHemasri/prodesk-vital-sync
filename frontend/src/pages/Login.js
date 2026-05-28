import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          user: {
            id: data._id,
            name: data.name,
            email: data.email,
            age: data.age,
            gender: data.gender,
          },
        })
      );

      toast.success("Successfully logged in! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-panel">
          <div className="login-hero">
            <span>Secure Healthcare Access</span>
            <h2>Welcome back to VitalSync</h2>
            <p>Sign in to manage appointments, access your care timeline, and stay connected with doctors from one secure platform.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <button type="submit">Login</button>
          </form>

          <div className="login-footer">
            <p onClick={() => navigate("/register")}>Don't have an account? Register</p>
            <small>HIPAA-grade protection. Encrypted data and fast authentication for clinicians and patients.</small>
          </div>
        </div>

        <aside className="login-summary">
          <h3>Why VitalSync?</h3>
          <ul>
            <li>Instant appointment booking</li>
            <li>Automated reminders and scheduling</li>
            <li>Secure, encrypted patient records</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Login;