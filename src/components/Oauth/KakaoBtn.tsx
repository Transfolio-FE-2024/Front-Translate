import { useNavigate } from "react-router-dom";

// import { issuedAuthCode } from "@/api/kakao";

export default function KakaoBtn() {
  const path = useNavigate();
  const onClick = async () => {
    path("/oauth/kakaocallback");
    // await issuedAuthCode();
    // console.log(REST_API);
  };

  return <div onClick={onClick}>카카오톡으로 시작하기</div>;
}
