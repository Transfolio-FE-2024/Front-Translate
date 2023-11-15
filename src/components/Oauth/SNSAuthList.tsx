import styles from "./SNSAUthList.module.scss";

import KakaoBtn from "./KakaoBtn";
import FacebookBtn from "./FacebookBtn";
import InstarBtn from "./InstarBtn";

export default function SNSAuthList() {
  return (
    <div className={styles.snsAuth}>
      <h1 className={styles.snsAuthTitle}>SNS로 시작하기</h1>
      <KakaoBtn />
      <FacebookBtn />
      <InstarBtn />
    </div>
  );
}
