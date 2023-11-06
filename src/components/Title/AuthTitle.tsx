interface Props {
  mainTitle: string;
  subTitle: string;
}

export default function AuthTitle(props: Props) {
  return (
    <>
      <p>{props.mainTitle}</p>
      <p>프리랜서 번역가님 !</p>
      <p>{props.subTitle} 해주세요 !</p>
    </>
  );
}
