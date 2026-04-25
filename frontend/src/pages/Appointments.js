import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAppointments,
  deleteAppointment,
  createAppointment
} from "../services/appointmentService";

import { createCheckoutSession } from "../services/paymentService";

import "./Appointments.css";

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [pendingBooking, setPendingBooking] = useState(null);

  //  Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //  Fetch appointments
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadAppointments();
  }, []);

  //  Check pending booking (after redirect)
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("success") === "true") {
      toast.success("Payment Done ✅");
      // Remove query params to prevent duplicate toasts
      navigate("/appointments", { replace: true });
    }

    if (params.get("pending") === "true") {
      const doctorId = params.get("doctorId");
      const doctorName = params.get("doctorName");
      const date = params.get("date");
      const time = params.get("time");

      if (doctorName && date && time) {
        setPendingBooking({
          doctorId,
          doctorName,
          date,
          time,
        });
      }
    }
  }, [location.search, navigate]);

  //  Cancel appointment
  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);

      setAppointments((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Appointment Cancelled ✅");
    } catch (err) {
      toast.error("Failed to cancel appointment");
    }
  };

  const handlePayment = async (appointmentId, doctorName, date, time) => {
  try {
    let finalAppointmentId = appointmentId;

    if (!finalAppointmentId) {
      toast.info("Creating appointment...");
      const newAppt = await createAppointment({ doctorName, date, time, reason: "Paid Consultation" });
      finalAppointmentId = newAppt._id;
    }

    const res = await createCheckoutSession(finalAppointmentId, doctorName, date, time);

    console.log("SESSION RESPONSE:", res);

    if (!res.url) {
      throw new Error("No session URL returned");
    }

    //  redirect to Stripe
    window.location.href = res.url;

  } catch (err) {
    console.error("PAYMENT ERROR:", err.message);
    toast.error("Payment failed");
  }
};

  return (
    <div className="appointments-container">

      <h2 className="title">My Appointments</h2>

      {/*  Pending Booking */}
      {pendingBooking && (
        <div className="appointment-card pending">
          <h3>Pending Booking</h3>

          <div className="left">
            <div className="details">
              <h3>{pendingBooking.doctorName}</h3>
              <p className="datetime">
                Date & Time: {pendingBooking.date} | {pendingBooking.time}
              </p>
            </div>
          </div>

          <div className="right">
            <button
              className="pay-btn"
              onClick={() => handlePayment(null, pendingBooking.doctorName, pendingBooking.date, pendingBooking.time)}
            >
              Pay & Confirm Appointment 💳
            </button>
          </div>
        </div>
      )}

      {/*  Appointments List */}
      {appointments.length === 0 && !pendingBooking ? (
        <p className="empty">No appointments found</p>
      ) : (
        appointments.map((item) => (
          <div className="appointment-card" key={item._id}>

            {/* LEFT */}
            <div className="left">
              <img
                src={
                  item.img ||
                  "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                }
                alt="doctor"
              />

              <div className="details">
                <h3>{item.doctorName}</h3>
                <p className="spec">
                  {item.spec || "General physician"}
                </p>

                <p className="datetime">
                  Date & Time: {item.date} | {item.time}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right">

              {item.isPaid ? (
                <button
                 className="pay-btn"
                 disabled
                 style={{ backgroundColor: "gray",color:"black", cursor: "not-allowed" }}
                > Paid ✅
                </button>
              ) : (
                <button
                 className="pay-btn"
                 onClick={() =>
                 handlePayment(item._id, item.doctorName, item.date, item.time)
                 }> Pay Online 💳
                </button>
              )}

              <button
                className="cancel-btn"
                onClick={() => handleDelete(item._id)}
              >
                Cancel appointment
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;