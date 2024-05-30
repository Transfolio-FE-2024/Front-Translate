import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import styles from "./Complete.module.scss";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../../../assets/images/home_logo.png";
import Layout from "@/components/Layout/Layout";

const Complete = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div></div>
          <div className={styles.content}>
            <div className={styles.pageSubTitleContainer}>
              <div className={styles.pageSubTitle}>프리랜서 번역가님!</div>
              <div className={styles.pageSubTitle}>환영합니다!</div>
            </div>
            <div className={styles.logoSection}>
              <img src={logoImage} className={styles.logo} />
            </div>
            <div className={styles.mainButton}>
              <MainButtonRound
                title="시작하기"
                onClicked={() => {
                  navigate("/home");
                }}
              />
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default Complete;
