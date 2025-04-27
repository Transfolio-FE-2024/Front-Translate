import axios from "axios";

const transfolioAxios = axios.create({
  baseURL: String(import.meta.env.VITE_API_HOST),
  withCredentials: true,
});

transfolioAxios.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 리턴
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("로그인이 필요합니다.");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default transfolioAxios;
