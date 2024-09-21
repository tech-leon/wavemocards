"use client";
import axios from "axios";

const APIPATH = process.env.NEXT_PUBLIC_API_URL
// const APIPATH = process.env.NEXT_PUBLIC_API_URL_LOCAL;
const SIGNUP = process.env.NEXT_PUBLIC_API_URL_REGISTER_USER;
const USERDATA = process.env.NEXT_PUBLIC_API_URL_GET_USER;

export const api = axios.create({
  baseURL: APIPATH,
  withCredentials: true,
});

const getTokenFromStorage = () => {
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    const user = JSON.parse(authUser);
    return user.stsTokenManager.accessToken;
  }
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const preSignUp = async (
  email: string,
  password: string,
  name: string,
  birthday: string,
  occupation: string,
  timezone: string
) => {
  const response = await api.post(`${SIGNUP}`, {
    email,
    password,
    name,
    birthday,
    occupation,
    timezone,
  });
  console.log(response.data);
  localStorage.setItem("userData", JSON.stringify(response.data));
  return response.data;
};

export const getUserData = async (userID: string) => {
  const response = await api.get(`${USERDATA}${userID}`);
  localStorage.setItem("userData", JSON.stringify(response.data));
  return response.data;
};
