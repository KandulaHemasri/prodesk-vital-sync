// // src/pages/Register.js
// import React, { useState } from "react";
// import { register } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check password match
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       await register({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       alert("Registered Successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>VitalSync Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />


//         <input
//           type="password"
//           placeholder="Confirm Password"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, confirmPassword: e.target.value })
//           }
//         />

//         <button type="submit">Register</button>
//       </form>

//       <p onClick={() => navigate("/")}>
//         Already have an account? Login
//       </p>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
      });

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

      toast.success("Successfully registered! Welcome to VitalSync 🎉");
      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration Failed";
      setErrors({ submit: errorMsg });
      toast.error(errorMsg);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-form-section">
          <h1>Create Account</h1>
          <p className="subtitle">Join VitalSync and book your appointments easily</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g., 25"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            {errors.submit && <div className="error-banner">{errors.submit}</div>}

            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>

          <div className="login-link">
            <p>Already have an account? <span onClick={() => navigate("/login")}>Login here</span></p>
          </div>
        </div>

        <div className="register-feature-panel">
          <h2>Why Join VitalSync?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <h3>Easy Scheduling</h3>
              <p>Book appointments with doctors in seconds</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Connect with qualified healthcare professionals</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💳</div>
              <h3>Secure Payment</h3>
              <p>Safe and encrypted payment processing</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Available 24/7</h3>
              <p>Access healthcare services anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;