"use client";
import axios, { AxiosInstance } from "axios";
// import { useAuth } from "@/lib/auth/authContext";

const APIPATH = process.env.NEXT_PUBLIC_API_URL;
// const APIPATH = process.env.NEXT_PUBLIC_API_URL_LOCAL;
const SIGNUP = process.env.NEXT_PUBLIC_API_URL_REGISTER_USER;
const USERDATA = process.env.NEXT_PUBLIC_API_URL_GET_USER;
const EMOTION_RECORDS = process.env.NEXT_PUBLIC_API_URL_EMOTION_RECORDS;
const EMOTION_LISTS = process.env.NEXT_PUBLIC_API_URL_EMOTION_LISTS;
// export const api = axios.create({
//   baseURL: APIPATH,
//   withCredentials: true,
// });

export const createApiClient = (userToken: string | null) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: APIPATH,
  });
  axiosInstance.interceptors.request.use((config) => {
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  });

  return axiosInstance;
};

export const preSignUp = async (
  email: string,
  password: string,
  name: string,
  birthday: string,
  occupation: string,
  timezone: string
) => {
  const api = createApiClient(null);
  try {
    const response = await api.post(`${SIGNUP}`, {
      email,
      password,
      name,
      birthday,
      occupation,
      timezone,
    });
    localStorage.setItem("userData", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("註冊失敗:", error);
    throw error;
  }
};

export const getUserData = async (userID: string, userToken: string) => {
  const api = createApiClient(userToken);
  const response = await api.get(`${USERDATA}${userID}`);
  localStorage.setItem("userData", JSON.stringify(response.data));
  return response.data;
};

export const getEmotionRecords = async (userID: string, userToken: string) => {
  const api = createApiClient(userToken);
  const response = await api.get(`${EMOTION_RECORDS}/${userID}`);
  return response.data;
};

export const getEmotionLists = async (userID: string, userToken: string) => {
  const api = createApiClient(userToken);
  const response = await api.get(`${EMOTION_LISTS}?user_id=${userID}`);
  return response.data;
};
