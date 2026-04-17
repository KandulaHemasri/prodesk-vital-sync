import axios from "axios";

const API_URL = "https://prodesk-vital-sync.onrender.com/api/auth/";

export const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);

  if (res.data.token) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);

  if (res.data.token) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};


export const logout = () => {
  localStorage.removeItem("user");
};