import axios from "axios";


export const getDoctors = async () => {
  const res = await axios.get("https://prodesk-vital-sync-1.onrender.com/api/doctors");
  return res.data;
};

export const getDoctorById = async (id) => {
  const res = await axios.get(`https://prodesk-vital-sync-1.onrender.com/api/doctors/${id}`);
  return res.data;
};