import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjg5MzU2NTQwLCJleHAiOjE2OTQ1NDA1NDB9.nvOIStUQzS_-C2mLMX9tuNSUWqVYbPNa9p_5HlMyoDI";

export const mssaemAxios = axios.create({
  baseURL: process.env.REACT_APP_MSSAEM_BASE_URL,
  headers: {
    Authorization: token,
    "Content-Type": "application/json",
  },
});

async function fetchData() {
  try {
    const response = await mssaemAxios.get("/some_endpoint");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
