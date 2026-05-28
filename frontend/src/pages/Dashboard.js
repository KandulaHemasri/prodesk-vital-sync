import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../services/doctorService";
import { getProtectedData } from "../services/patientService";
import { getAppointments } from "../services/appointmentService";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
        await getProtectedData();
        const [doctorList, apptsData] = await Promise.all([
          getDoctors().catch(() => []),
          getAppointments().catch(() => []),
        ]);

        setDoctors(doctorList || []);
        setAppointments(apptsData || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const availableDoctors = useMemo(
    () => doctors.filter((doctor) => doctor.available),
    [doctors]
  );

  const upcomingAppointments = useMemo(() => appointments.slice(0, 4), [appointments]);

  const prescriptions = useMemo(() => {
    return appointments.map((appt, index) => ({
      id: appt._id || index,
      doctor: appt.doctorName,
      date: appt.date,
      medication: "Follow-up Medication",
      instructions: `Take as prescribed by ${appt.doctorName}.`,
    }));
  }, [appointments]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        <div className="dash-welcome-banner">
          <div>
            <p className="dash-subtitle">Live appointment control center</p>
            <h1>Welcome back, {user?.user?.name || user?.name || "Patient"}</h1>
            <p className="dash-intro">Your doctors, appointments, and prescriptions are visible at a glance.</p>
          </div>
        </div>

        <div className="dash-bento-grid">
          <div className="dash-card dash-primary-card" onClick={() => navigate("/doctors")}>
            <h3>🩺 Doctors Availability</h3>
            <p>{availableDoctors.length} doctors currently available for booking.</p>
            <span className="record-badge">Total Doctors: {doctors.length}</span>
          </div>

          <div className="dash-card dash-secondary-card" onClick={() => navigate("/appointments")}>
            <h3>📅 Appointments</h3>
            <p>{appointments.length} total appointments found on your account.</p>
            <span className="record-badge">Upcoming: {upcomingAppointments.length}</span>
          </div>

          <div className="dash-card dash-tertiary-card" onClick={() => navigate("/appointments")}>
            <h3>💊 Prescriptions</h3>
            <p>{prescriptions.length} prescriptions are available for review.</p>
            <span className="record-badge">Latest: {prescriptions[0]?.medication || "No prescriptions"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;