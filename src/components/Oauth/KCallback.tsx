import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_SITE_ADDRESS } from "@/util/const";

const REDIRECT_URL = CLIENT_SITE_ADDRESS + "/oauth/kakocallback";

export default function KCallback() {
  const navigate = useNavigate();

  const api = useCallback(async (code : string) => {
    try {
      const kakaoLoginResult = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {
          "grant_type": "authorization_code",
          "client_id": import.meta.env.VITE_KAKAO_REST_API,
          "redirect_uri": REDIRECT_URL,
          code,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        })

        await axios.post("https://localhost:4000/api/login/kakao", {
          ...kakaoLoginResult,
        })

        navigate("/home");
        
    } catch (e) { 
      alert("카카오 로그인에 실패하였습니다.");
      return navigate("/signin");
    }
  }, [])

  useEffect(() => {
    const code = window.location.href.split("?code=")[1];
    if (code === undefined || code === null) {
      alert("카카오 로그인에 실패하였습니다.");
      navigate("/signin");
    } else {
      api(code);
    }
  }, [])
  return null;
}
