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
    const data = await login(formData);

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: data.token,
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
        },
      })
    );

    alert("Login Successful!");
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Invalid Credentials");
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

      <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
        Don't have an account? Register
      </p>
    </div>
  );
};

export default Login;