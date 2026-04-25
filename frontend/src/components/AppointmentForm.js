// import React, { useState } from "react";
// import { createAppointment } from "../services/appointmentService";
// import { toast } from "react-toastify";

// import "./AppointmentForm.css";

// const doctors = [
//   "Dr. Saba Ahmed - Gynecologist",
//   "Dr. Ahmed Raza - Dermatologist",
//   "Dr. Usman - Pediatrician",
//   "Dr. Ali Hassan - Physician",
//   "Dr. Bilal Khan - Gastroenterologist",
// ];

// const AppointmentForm = ({ setAppointments }) => {
//   const [form, setForm] = useState({
//     doctorName: "",
//     date: "",
//     time: "",
//     reason: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await createAppointment(form);

//       const newAppointment =
//         res?.data?.appointment || res?.appointment || res;

//       setAppointments((prev) => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         return [...safePrev, newAppointment];
//       });

//       setForm({
//         doctorName: "",
//         date: "",
//         time: "",
//         reason: "",
//       });

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="appt-form-box">

//       <h2>📅 Book Appointment</h2>

//       <form onSubmit={handleSubmit}>

//         {/* 👇 DOCTOR DROPDOWN */}
//         <div className="input-group">
//           <label>Select Doctor</label>
//           <select
//             name="doctorName"
//             value={form.doctorName}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Choose Doctor --</option>
//             {doctors.map((doc, index) => (
//               <option key={index} value={doc}>
//                 {doc}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="row">

//           <div className="input-group">
//             <label>Date</label>
//             <input
//               type="date"
//               name="date"
//               value={form.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Time</label>
//             <input
//               type="time"
//               name="time"
//               value={form.time}
//               onChange={handleChange}
//               required
//             />
//           </div>

//         </div>

//         <div className="input-group">
//           <label>Reason</label>
//           <textarea
//             name="reason"
//             value={form.reason}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button className="submit-btn">
//           Book Appointment
//         </button>

//       </form>
//     </div>
//   );
// };


// export default AppointmentForm;





import React, { useState } from "react";
import { createAppointment } from "../services/appointmentService";
import { toast } from "react-toastify";

import "./AppointmentForm.css";

const doctors = [
  { name: "Dr. Saba Ahmed", spec: "Gynecologist", available: true },
  { name: "Dr. Ahmed Raza", spec: "Dermatologist", available: false },
  { name: "Dr. Usman", spec: "Pediatrician", available: true },
  { name: "Dr. Ali Hassan", spec: "Physician", available: true },
  { name: "Dr. Bilal Khan", spec: "Gastroenterologist", available: false },
];

const AppointmentForm = ({ setAppointments, existingAppointments = [] }) => {
  const [form, setForm] = useState({
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // check slot conflict
  const isSlotTaken = (date, time) => {
    return existingAppointments.some(
      (item) => item.date === date && item.time === time
    );
  };

  // select doctor
  const handleDoctorSelect = (doc) => {
    if (!doc.available) {
      toast.error("Doctor is currently unavailable ❌");
      return;
    }

    setForm({
      ...form,
      doctorName: `${doc.name} - ${doc.spec}`,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 SLOT CHECK
    if (isSlotTaken(form.date, form.time)) {
      toast.error("This slot is already booked ⛔");
      return;
    }

    try {
      const res = await createAppointment(form);

      const newAppointment =
        res?.data?.appointment || res?.appointment || res;

      setAppointments((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev, newAppointment];
      });

      toast.success("Appointment booked successfully 🩺");

      setForm({
        doctorName: "",
        date: "",
        time: "",
        reason: "",
      });

    } catch (err) {
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div className="form-card">

      <h2>📅 Book Appointment</h2>
      <p className="sub">Choose doctor & schedule your visit</p>

      {/* DOCTOR CARDS */}
      <div className="doctor-grid">
        {doctors.map((doc, i) => (
          <div
            key={i}
            className={`doctor-card ${
              form.doctorName.includes(doc.name) ? "active" : ""
            }`}
            onClick={() => handleDoctorSelect(doc)}
          >
            <h4>
              {doc.name}
              <span className={doc.available ? "online" : "offline"}>
                {doc.available ? " 🟢 Available" : " 🔴 Busy"}
              </span>
            </h4>
            <p>{doc.spec}</p>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="doctorName"
          placeholder="Selected Doctor"
          value={form.doctorName}
          onChange={handleChange}
          readOnly
          required
        />

        <div className="row">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="reason"
          placeholder="Describe your issue..."
          value={form.reason}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Book Appointment
        </button>

      </form>
    </div>
  );
};

export default AppointmentForm;