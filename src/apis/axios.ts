import axios from "axios";

export const mssaemAxios = axios.create({
  baseURL: process.env.REACT_APP_MSSAEM_BASE_URL,
});
