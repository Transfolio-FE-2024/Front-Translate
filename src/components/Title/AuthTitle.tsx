import styles from "./AuthTitle.module.scss";

interface Props {
  mainTitle: string;
  subTitle: string;
}

export default function AuthTitle(props: Props) {
  return (
    <div className={styles.authWrap}>
      <p className={styles.authTitle}>{props.mainTitle}</p>
      <p className={styles.authUser}>프리랜서 번역가님 !</p>
      <p className={styles.authDo}>{props.subTitle} 해주세요</p>
    </div>
  );
}
