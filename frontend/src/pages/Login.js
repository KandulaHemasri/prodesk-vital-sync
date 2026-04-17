import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>VitalSync Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>

      <p onClick={() => navigate("/register")}>
        Don't have an account? Register
      </p>
    </div>
  );
};

export default Login;