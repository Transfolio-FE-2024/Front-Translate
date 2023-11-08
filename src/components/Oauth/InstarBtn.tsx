export default function InstarBtn() {
  const onClick = () => console.log("인스타그램 로그인");

  return <div onClick={onClick}>인스타그램으로 시작하기</div>;
}
