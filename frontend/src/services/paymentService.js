import axios from "axios";

export const createCheckoutSession = async (appointmentId, doctorName, date, time) => {
  const res = await axios.post(
    "https://prodesk-vital-sync.onrender.com/api/payment/create-checkout-session",
    { appointmentId, doctorName, date, time }
  );
  return res.data;
};