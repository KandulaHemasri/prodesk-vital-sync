import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/patients/";

export const getProtectedData = async () => {
  const token = getToken();

  const res = await axios.get(API_URL + "data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};