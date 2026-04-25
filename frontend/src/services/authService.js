import axios from "axios";

const API_URL = "https://prodesk-vital-sync-1.onrender.com/api/auth/";

// REGISTER
export const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);

  if (res.data.token) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: res.data.token,
        user: {
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        },
      })
    );
  }

  return res.data;
};

//  LOGIN
export const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);

  if (res.data.token) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: res.data.token,
        user: {
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        },
      })
    );
  }

  return res.data;
};

// GET TOKEN (MOST IMPORTANT FIX)
export const getToken = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("user"));
    return stored?.token || null;
  } catch {
    return null;
  }
};

// logout
export const logout = () => {
  localStorage.removeItem("user");
};