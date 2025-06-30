// const API_URL = `http://localhost:5000/api`;
const API_URL = `https://xnotes-buildout.onrender.com/api`;
//dummy
import axios from "axios";
import { useEffect } from "react";

export const register = async (data) => {
  try {
    console.log(data);
    const result = await axios.post(`${API_URL}/auth/register`, data);

    console.log("registered", result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleLogin = async (data) => {
  try {
    const result = await axios.post(`${API_URL}/auth/login`, data);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AddNotes = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.post(`${API_URL}/notes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAlNotes = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DeleteService = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.delete(`${API_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const EditService = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${API_URL}/notes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handlePin = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${API_URL}/notes/${id}/pin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("pinned", res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
