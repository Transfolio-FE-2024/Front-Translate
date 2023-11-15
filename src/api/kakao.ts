import axios from "axios";

const BASE_URL = "https://kauth.kakao.com/oauth/authorize";
const REDIRECT_URI = "http://localhost:5173/oauth/kakaocallback";
const REST_API = import.meta.env.VITE_KAKAO_REST_API;

export const issuedAuthCode = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/?response_type=code&client_id=${REST_API}&redirect_uri=${REDIRECT_URI}`
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
