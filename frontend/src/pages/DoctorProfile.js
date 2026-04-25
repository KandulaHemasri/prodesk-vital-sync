import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getDoctorById } from "../services/doctorService";
import "./Appointments";

import {
  getBookedSlots,
  createAppointment,
} from "../services/appointmentService";

import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = [
    "06:00 pm",
    "06:30 pm",
    "07:00 pm",
    "07:30 pm",
    "08:00 pm",
    "08:30 pm",
  ];

  // Generate next 7 days
  const generateDates = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const next = new Date();
      next.setDate(today.getDate() + i);

      dates.push({
        full: next,
        day: next.toLocaleDateString("en-US", { weekday: "short" }),
        date: next.getDate(),
        month: next.toLocaleDateString("en-US", { month: "short" }),
      });
    }

    return dates;
  };

  const dateList = generateDates();

  // Load doctor details
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadDoctor();
  }, [id]);

  //  Load booked slots
 useEffect(() => {
  const loadSlots = async () => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const res = await getBookedSlots(id, formattedDate);

      setBookedSlots(res || []);
    } catch (err) {
      console.log(err);
    }
  };

  loadSlots();
}, [id, date]);

  //  BOOK APPOINTMENT
  const handleBooking = async () => {
  try {
    const payload = {
      // doctorId: id,
      doctorName: doctor.name,
      date: date.toISOString().split("T")[0],
      time: selectedTime,
      reason: "Consultation",
    };

    console.log("SENDING:", payload);

    await createAppointment(payload);

    toast.success("Appointment booked successfully 🎉");

    navigate("/appointments");
  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Booking failed");
  }
};

  if (!doctor) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-page">

      {/* LEFT SIDE */}
      <div className="profile-left">
        <div className="doctor-card">
          <img src={doctor.img} alt={doctor.name} />

          <div className="info">
            <h2>{doctor.name}</h2>
            <p className="spec">{doctor.spec}</p>

            <span className={`status ${doctor.available ? "online" : "offline"}`}>
              {doctor.available ? "🟢 Available" : "🔴 Not Available"}
            </span>

            <p className="exp">Experience: {doctor.exp || 5}+ Years</p>

            <p className="about">
              {doctor.about ||
                "Highly skilled doctor providing quality treatment with modern techniques."}
            </p>

            <p className="fee">Consultation Fee: ₹500</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">
        <div className="booking-card">

          <h3>Select Date</h3>

          {/*  Calendar */}
          <div className="calendar">
            {dateList.map((d, i) => (
              <div
                key={i}
                className={
                  date.toDateString() === d.full.toDateString()
                    ? "date-box active"
                    : "date-box"
                }
                onClick={() => setDate(d.full)}
              >
                <p>{d.day}</p>
                <h4>{d.date}</h4>
                <span>{d.month}</span>
              </div>
            ))}
          </div>

          <h3>Available Slots</h3>

          {/* Time Slots */}
          <div className="times">
            {timeSlots.map((time, i) => {
              const isBooked = bookedSlots.includes(time);

              return (
                <button
                  key={i}
                  disabled={isBooked}
                  className={
                    selectedTime === time
                      ? "time active"
                      : isBooked
                      ? "time disabled"
                      : "time"
                  }
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>

          <button className="book-btn" onClick={handleBooking}>
            Pay & Book Appointment 💳
          </button>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;