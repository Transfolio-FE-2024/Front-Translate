import styles from "./Start.module.scss";
import logoImage from "../../assets/images/home_logo.png";
import GreyButtonRound from "@/components/button/grey-button-round/GreyButtonRound";
import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span className={styles.subTitle}>
        프리랜서 번역가도, 포트폴리오가 있다
      </span>
      <div className={styles.divider}></div>
      <div className={styles.logoSection}>
        <img src={logoImage} className={styles.logo} alt="logo" />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.buttonSection}>
        <GreyButtonRound
          title="로그인"
          onClicked={() => {
            navigate("/signin");
          }}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttonSection}>
        <MainButtonRound
          title="회원가입"
          onClicked={() => {
            navigate("/signup/regform");
          }}
        />
      </div>
    </div>
  );
};

export default Start;
