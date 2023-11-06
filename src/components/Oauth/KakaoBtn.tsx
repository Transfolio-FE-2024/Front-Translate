export default function KakaoBtn() {
  const onClick = () => console.log("카카오 로그인");

  return <div onClick={onClick}>카카오톡으로 시작하기</div>;
}
