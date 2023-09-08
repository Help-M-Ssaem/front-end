// axios.ts
import axios from "axios";

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
    if (error.response?.data?.message === "만료된 JWT입니다.") {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await axios.patch("/member/refresh", null, {
          baseURL: process.env.REACT_APP_MSSAEM_BASE_URL,
          headers: {
            refreshToken: `${refreshToken}`,
          },
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // 새로운 accessToken과 refreshToken을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        console.log("발급 완료");
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return mssaemAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
