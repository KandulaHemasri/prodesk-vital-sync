import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProtectedData } from "../services/patientService";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProtectedData();
        console.log("Protected Data:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);
  

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);



  return (
    <>

      <div className="dashboard">
        <h1>VitalSync Healthcare Dashboard</h1>

        <div className="card-container">
          
          <div className="card">
            <h3>📅 Appointments</h3>
            <p>Book and manage doctor appointments.</p>
          </div>

          <div className="card">
            <h3>📜 Medical History</h3>
            <p>View your past health records timeline.</p>
          </div>

          <div className="card">
            <h3>💊 Prescriptions</h3>
            <p>Access doctor prescriptions anytime.</p>
          </div>

          <div className="card">
            <h3>🟢 Doctor Availability</h3>
            <p>Check real-time doctor status.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;