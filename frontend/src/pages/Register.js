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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("REGISTER RESPONSE:", res);

      alert("Registered Successfully!");

      navigate("/dashboard"); 

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container">
      <h2>VitalSync Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>

      <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;