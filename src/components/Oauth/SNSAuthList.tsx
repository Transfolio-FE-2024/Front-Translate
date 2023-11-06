import KakaoBtn from "@/components/Oauth/KakaoBtn";
import FacebookBtn from "./FacebookBtn";
import InstarBtn from "./InstarBtn";

export default function SNSAuthList() {
  return (
    <>
      <h1>SNS로 시작하기</h1>
      <KakaoBtn />
      <FacebookBtn />
      <InstarBtn />
    </>
  );
}
