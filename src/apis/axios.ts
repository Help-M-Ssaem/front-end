// axios.ts

import axios from "axios";
import { useGetToken } from "../hooks/user/useGetToken";

//로그인 토큰
// let token = localStorage.getItem("accessToken");

let token =
  "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjg5MzU2NTQwLCJleHAiOjE2OTQ1NDA1NDB9.nvOIStUQzS_-C2mLMX9tuNSUWqVYbPNa9p_5HlMyoDI";

export const mssaemAxios = axios.create({
  baseURL: process.env.REACT_APP_MSSAEM_BASE_URL,
  headers: {
    Authorization: token,
    "Content-Type": "application/json",
  },
});

mssaemAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    //message가 "만료된 JWT입니다". 일 경우
    if (error.response?.data?.message === "만료된 JWT입니다.") {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          console.log("refreshToekn");
          const { data, mutate } = useGetToken();
          const accessToken = data?.accessToken || "";
          token = accessToken;
          originalRequest.headers["Authorization"] = accessToken;
          return mssaemAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing tokens:", refreshError);
      }
    }
    throw error;
  },
);
