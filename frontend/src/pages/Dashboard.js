import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProtectedData } from "../services/patientService";
import { getAppointments } from "../services/appointmentService";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  //  Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //  Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProtectedData(); // Kept for backend ping if needed
        const apptsData = await getAppointments().catch(() => []);
        
        // We only use appointments count currently
        setAppointmentsCount(apptsData?.length || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        
        {/* WELCOME BANNER */}
        <div className="dash-welcome-banner">
          <h1>Welcome 👋 {user?.user?.name || user?.name || "Patient"}</h1>
        </div>

        {/* BENTO GRID DATA */}
        <div className="dash-bento-grid">

          <div 
            className="dash-card dash-primary-card"  
            onClick={() => navigate("/appointments")}
          >
            <h3>📅 Appointments</h3>
            <p>Book and manage your doctor appointments securely and efficiently.</p>
            <span className="record-badge">Total Records: {appointmentsCount}</span>
          </div>

          <div className="dash-card">
            <h3>📜 Medical History</h3>
            <p>View your past health records and medical timeline.</p>
          </div>

          <div className="dash-card">
            <h3>💊 Prescriptions</h3>
            <p>Access and review doctor prescriptions anytime, anywhere.</p>
          </div>

          <div className="dash-card">
            <h3>🟢 Doctor Availability</h3>
            <p>Check real-time doctor status and schedule efficiently.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;