import axios from "axios";
import { CLIENT_SITE_ADDRESS } from "@/util/const";

const kakaoApi = () => {
  const BASE_URL = "https://kauth.kakao.com/oauth/token";
  const REDIRECT_URL = CLIENT_SITE_ADDRESS + "oauth/kakaocallback";
  const REST_API = import.meta.env.VITE_KAKAO_REST_API;

  /** */
  async function getKakaoToken() {
    const code = window.location.href.split("?code=")[1];
    if (code === undefined || code === null) {
      return Promise.reject("There is no code");
    }

    return await axios.post(
      BASE_URL,
      {
        grant_type: "authorization_code",
        client_id: REST_API,
        redirect_uri: REDIRECT_URL,
        code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
  }

  return {
    getKakaoToken,
  };
};

export default kakaoApi();
