import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import styles from "./Complete.module.scss";

const Complete = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <div className={styles.pageSubTitle}>프리랜서 번역가님!</div>
            <div className={styles.pageSubTitle}>환영합니다!</div>
          </div>
          <div className={styles.logoSection}>
            <img
              src="/src/assets/transpolio_logo.png"
              className={styles.logo}
            />
          </div>
          <div className={styles.mainButton}>
            <MainButtonRound title="회원가입 완료하기" onClicked={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Complete;
