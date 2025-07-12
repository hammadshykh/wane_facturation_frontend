// lib/api/axiosInstance.ts
"use client";
import axios from "axios";
const DBURL = "/api/v1";
const axiosInstance = axios.create({
 baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}${DBURL}`,
});

axiosInstance.interceptors.response.use(
 (response) => response,
 (error) => {
  console.error("API Error:", error);
  return Promise.reject(error);
 }
);

export default axiosInstance;
