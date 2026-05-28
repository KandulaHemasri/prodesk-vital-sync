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

  // Generate real-time availability slots
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If selected date is today, start from next available time
    let startHour = 9; // 9 AM
    let startMinute = 0;

    if (selectedDate.getTime() === today.getTime()) {
      // For today, find next available slot after current time
      startHour = now.getHours();
      startMinute = now.getMinutes();

      // Round up to next 30-minute slot
      if (startMinute < 30) {
        startMinute = 30;
      } else {
        startHour += 1;
        startMinute = 0;
      }

      // If it's already past work hours, no slots available
      if (startHour >= 21) {
        return slots;
      }
    }

    // Generate slots from start time until 9 PM (21:00)
    for (let hour = startHour; hour < 21; hour++) {
      for (let minute = startMinute; minute < 60; minute += 30) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        const displayTime = hour > 12 
          ? `${hour - 12}:${String(minute).padStart(2, "0")} pm`
          : `${hour}:${String(minute).padStart(2, "0")} am`;
        slots.push({ time: timeString, display: displayTime });
      }
      startMinute = 0; // After first iteration, always start at :00
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

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
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, i) => {
                const isBooked = bookedSlots.includes(slot.display);

                return (
                  <button
                    key={i}
                    disabled={isBooked}
                    className={
                      selectedTime === slot.display
                        ? "time active"
                        : isBooked
                        ? "time disabled"
                        : "time"
                    }
                    onClick={() => setSelectedTime(slot.display)}
                  >
                    {slot.display}
                  </button>
                );
              })
            ) : (
              <p className="no-slots">No available slots for this date</p>
            )}
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