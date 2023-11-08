export default function FacebookBtn() {
  const onClick = () => console.log("페이스북 로그인");

  return <div onClick={onClick}>페이스북으로 시작하기</div>;
}
