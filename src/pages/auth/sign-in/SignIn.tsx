import { useState } from "react";
import TextField from "../../../components/text-field/TextField";
import styles from "./SignIn.module.scss";
import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import SnsButton from "@/components/button/sns-button/SnsButton";
import kakaoImg from "../../../assets/images/sns_kakaotalk.png";

const SignIn = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.pageTitleSection}>
            <div className={styles.pageTitle}>Login</div>
            <div>
              <div className={styles.pageSubTitle}>프리랜서 번역가님!</div>
              <div className={styles.pageSubTitle}>로그인 해주세요</div>
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputTitle}>아이디</div>
            <div className={styles.input}>
              <TextField value={id} onChange={(value) => setId(value)} />
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={styles.input}>
              <TextField
                value={password}
                onChange={(value) => setPassword(value)}
                hide={true}
              />
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.divider}></div>
          <div className={styles.buttonSection}>
            <MainButtonRound title="로그인" onClicked={() => {}} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.divider}></div>
          <div className={styles.snsSignInTitle}>SNS로 시작하기</div>
          <div className={styles.divider}></div>
          <div className={styles.snsButtonSection}>
            <SnsButton
              img={kakaoImg}
              title="카카오톡으로 시작하기"
              onClicked={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
