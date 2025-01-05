import axios from "axios";

const transfolioAxios = axios.create({
  baseURL: String(import.meta.env.VITE_API_HOST),
  withCredentials: true,
});

export default transfolioAxios;
