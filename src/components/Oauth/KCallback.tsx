import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getKakaoToken } from "@/api/kakao";
import { kakaoLogin } from "@/api/auth";

export default function KCallback() {
  const navigate = useNavigate();
  const { data: kakaoTokenData, isError: kakaoTokenError, isSuccess : kakaoTokenSuccess } = useQuery({
    queryKey: ["getKakaoToken"], queryFn: getKakaoToken,
    retry : 0,
  });
  const { isError: serverError, isSuccess : serverSuccess } = useQuery({
    queryKey: ["kakaoLogin"],
    queryFn: () => kakaoLogin(kakaoTokenData),
    enabled: !!kakaoTokenData,
    retry : 0,
  })

  useEffect(() => {
    if (kakaoTokenError) {
      alert("카카오에 로그인 할 수 없습니다.");
      return navigate("/signin");
    }
  }, [kakaoTokenError])

  useEffect(() => {
    if(serverError) {
      alert("서버에 로그인 할 수 없습니다.");
      return navigate("/signin");
    }
  }, [serverError])

  useEffect(() => {
    if(serverSuccess && kakaoTokenSuccess) return navigate("/home");
  }, [kakaoTokenSuccess, serverSuccess])

  return null;
}
