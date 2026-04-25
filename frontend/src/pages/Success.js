import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateAppointment } from "../services/appointmentService";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processPayment = async () => {
      const params = new URLSearchParams(location.search);
      const appointmentId = params.get("appointmentId");

      if (appointmentId) {
        try {
          await updateAppointment(appointmentId, { isPaid: true });
        } catch (err) {
          console.error("Failed to update appointment:", err);
        }
      }
      
      setTimeout(() => {
        // Redirection query param so Appointments.js knows to show the toast
        navigate("/appointments?success=true");
      }, 2000);
    };
    
    processPayment();
  }, [location.search, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Redirecting to your appointments...</p>
    </div>
  );
};

export default Success;





// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createAppointment } from "../services/appointmentService";

// const Success = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const doctorName = params.get("doctor");
//     const date = params.get("date");
//     const time = params.get("time");

//     const saveAppointment = async () => {
//       try {
//         await createAppointment({
//           doctorName,
//           date,
//           time,
//           reason: "Paid Consultation",
//         });

//         navigate("/appointments");

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     saveAppointment();
//   }, [location, navigate]);

//   return <h2>Processing Payment...</h2>;
// };

// export default Success;