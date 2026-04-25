// import React, { useState } from "react";
// import "./Doctors.css";

// const doctorsData = [
//   {
//     name: "Dr. Saba Ahmed",
//     spec: "Gynecologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
//   },
//   {
//     name: "Dr. Ahmed Raza",
//     spec: "Dermatologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
//   },
//   {
//     name: "Dr. Muhammad Usman",
//     spec: "Pediatricians",
//     available: true,
//     img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
//   },
//   {
//     name: "Dr. Rabia Shaheen",
//     spec: "Neurologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
//   },
//   {
//     name: "Dr. Ali Hassan",
//     spec: "Neurologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
//   },
//   {
//     name: "Dr. Bilal Khan",
//     spec: "General physician",
//     available: true,
//     img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
//   },

//   // 🔥 NEW DOCTORS ADDED

//   {
//     name: "Dr. Komal Riaz",
//     spec: "Dermatologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
//   },
//   {
//     name: "Dr. Fahad Mahmood",
//     spec: "Gastroenterologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0",
//   },
//   {
//     name: "Dr. Sana Iqbal",
//     spec: "Gynecologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde",
//   },
//   {
//     name: "Dr. Ayesha Noor",
//     spec: "Pediatricians",
//     available: true,
//     img: "https://images.unsplash.com/photo-1598257006458-087169a1f08d",
//   },
//   {
//     name: "Dr. Hassan Tariq",
//     spec: "General physician",
//     available: true,
//     img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
//   },
//   {
//     name: "Dr. Zain Ali",
//     spec: "Neurologist",
//     available: true,
//     img: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471",
//   },
// ];

// const categories = [
//   "All",
//   "General physician",
//   "Gynecologist",
//   "Dermatologist",
//   "Pediatricians",
//   "Neurologist",
//   "Gastroenterologist",
// ];

// const Doctors = () => {
//   const [selected, setSelected] = useState("All");

//   // ✅ FILTER LOGIC
//   const filteredDoctors =
//     selected === "All"
//       ? doctorsData
//       : doctorsData.filter((doc) => doc.spec === selected);

//   return (
//     <div className="doctors-container">

//       <h2>Find Your Doctor</h2>
//       <p className="subtitle">
//         Browse through specialist doctors for your needs
//       </p>

//       <div className="layout">

//         {/* SIDEBAR */}
//         <div className="sidebar">
//           {categories.map((cat, index) => (
//             <button
//               key={index}
//               className={selected === cat ? "active" : ""}
//               onClick={() => setSelected(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* GRID */}
//         <div className="doctor-grid">
//           {filteredDoctors.map((doc, i) => (
//             <div className="doctor-card" key={doc._id}>

//   <img src={doc.img} alt={doc.name} />

//   <div className="card-content">
//     <p className="status">
//       {doc.available ? "🟢 Available" : "🔴 Busy"}
//     </p>

//     <h3>{doc.name}</h3>
//     <p className="spec">{doc.spec}</p>

//     <div className="card-actions">
//       <button
//         onClick={() => navigate(`/doctor/${doc._id}`)}
//         className="view-btn"
//       >
//         View Profile
//       </button>

//       <button
//         disabled={!doc.available}
//         onClick={() =>
//           navigate("/appointments", { state: { doctor: doc } })
//         }
//         className="book-btn"
//       >
//         Book Now
//       </button>
//     </div>
//   </div>

// </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Doctors;






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../services/doctorService";
import "./Doctors.css";


const categories = [
  "All",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  //  FETCH FROM BACKEND
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  //  FILTER LOGIC
  const filteredDoctors =
    selected === "All"
      ? doctors
      : doctors.filter((doc) => doc.spec === selected);


  return (
    <div className="doctors-container">

      <h2>Find Your Doctor</h2>
      <p className="subtitle">
        Browse through specialist doctors for your needs
      </p>

      <div className="layout">
        <div className="sidebar">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={selected === cat ? "active" : ""}
              onClick={() => setSelected(cat)}
            >
              🩺 {cat}
            </button>
          ))}
        </div>

        <div className="doctor-grid">

          {loading ? (
            <p className="loading">Loading doctors...</p>
          ) : filteredDoctors.length === 0 ? (
            <p className="no-data">No doctors found</p>
          ) : (
            filteredDoctors.map((doc) => (
              <div className="doctor-card" key={doc._id}>

                <img src={doc.img} alt={doc.name} />

                <div className="card-content">

                  <p className="status">
                    {doc.available ? "🟢 Available" : "🔴 Busy"}
                  </p>

                  <h3>{doc.name}</h3>
                  <p className="spec">{doc.spec}</p>
                  <p className="exp">{doc.exp} yrs experience</p>

                  <div className="card-actions">

                  <button onClick={() => navigate(`/doctor/${doc._id}`)}>Book Appointment</button>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Doctors;