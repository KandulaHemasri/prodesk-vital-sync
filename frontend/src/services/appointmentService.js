import axios from "axios";
import { getToken } from "./authService";

const API = "https://prodesk-vital-sync.onrender.com/api/appointments";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// GET
export const getAppointments = async () => {
  const res = await axios.get(API, authHeader());
  return res.data;
};


export const getBookedSlots = async (doctorId, date) => {
  const token = getToken();

  const res = await axios.get(`${API}/slots/${doctorId}`, {
    params: { date },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// CREATE
export const createAppointment = async (data) => {
  const token = getToken();

  console.log("TOKEN BEING SENT:", token); // DEBUG

  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// UPDATE
export const updateAppointment = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data, authHeader());
  return res.data;
};

// DELETE
export const deleteAppointment = async (id) => {
  await axios.delete(`${API}/${id}`, authHeader());
};