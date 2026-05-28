import axios from "axios";
import { getToken } from "./authService";

const API_URL = "https://prodesk-vital-sync-1.onrender.com/api/patients/";

export const getProtectedData = async () => {
  const token = getToken();

  const res = await axios.get(API_URL + "data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUserProfile = async (data) => {
  const token = getToken();

  const res = await axios.put(API_URL + "update-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};