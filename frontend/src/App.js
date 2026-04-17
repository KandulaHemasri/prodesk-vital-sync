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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />

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