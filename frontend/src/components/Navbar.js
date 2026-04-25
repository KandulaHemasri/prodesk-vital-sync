import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Smart Create Account behavior
  const handleLogin = () => {
    if (user) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">

  
      <h2 className="logo" onClick={() => navigate("/home")}>
        VitalSync
      </h2>

      <ul className="nav-links">
        <li onClick={() => navigate("/home")}>HOME</li>
        <li onClick={() => navigate("/doctors")}>ALL DOCTORS</li>
        <li onClick={() => navigate("/about")}>ABOUT</li>
        <li onClick={() => navigate("/contact")}>CONTACT</li>
        <li onClick={() => navigate("/appointments")}>APPOINTMENTS</li>
      </ul>


      <div className="nav-right">
        {!user ? (
          <button onClick={handleLogin}>
            LOGIN
          </button>
        ) : (
          <>
            <span className="profile-name">
              👤 {user?.user?.name || user?.name}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;