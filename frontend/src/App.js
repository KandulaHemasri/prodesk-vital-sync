import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointments from "./pages/Appointments";
import DoctorProfile from "./pages/DoctorProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./pages/PaymentPage";


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="/payment" element={<PaymentPage />} />
      

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/>


<Route
  path="/doctor/:id"
  element={
    <ProtectedRoute>
      <DoctorProfile />
    </ProtectedRoute>
  }
/>


  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route
    path="/doctors"
    element={
      <ProtectedRoute>
        <Doctors />
      </ProtectedRoute>
    }
  />

  <Route
    path="/about"
    element={
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    }
  />


  <Route
    path="/contact"
    element={
      <ProtectedRoute>
        <Contact />
      </ProtectedRoute>
    }
  />
</Routes>
    </Router>
  );
}

export default App;